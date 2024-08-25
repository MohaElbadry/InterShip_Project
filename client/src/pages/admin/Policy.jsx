import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import MenuDark from "../../components/layout/MenuDark";
import SidebarDark from "../../components/layout/SidebarDark";
import PolicyTable from "../../components/common/admin/policy/PolicyTable";
import PolicyAddModal from "../../components/common/admin/policy/PolicyAddModal";
import icon from "../../assets/plus_round_icon.svg";

export default function Policy() {
  const { auth } = useAuth();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPolicies = policies.filter(
    (policy) =>
      policy.policy_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchPolicies = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_LINK}/insurance/`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setPolicies(response.data.reverse());
      if (response.data.length === 0) {
        setMessage("No policies found.");
      } else {
        setMessage("");
      }
    } catch (error) {
      console.error("Error fetching policies:", error);
      setMessage("An error occurred while fetching policies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, [auth.token]);

  const handleAddPolicy = (newPolicy) => {
    setPolicies((prevPolicies) => [newPolicy, ...prevPolicies]);
    closeModal();
  };

  const handleStatusChange = (policyId, newStatus) => {
    setPolicies((prevPolicies) =>
      prevPolicies.map((policy) =>
        policy.id === policyId ? { ...policy, status: newStatus } : policy
      )
    );
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-700 text-black">
      <MenuDark />
      <SidebarDark />
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={openModal}
            className="bg-[#F7BB00] my-4 font-bold py-2 px-2 ml-4 rounded-full"
          >
            <img src={icon} alt="logo" className="w-4" />
          </button>
          <div className="mr-4">
            <input
              type="text"
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {policies.length > 0 ? (
          <PolicyTable
            policies={filteredPolicies}
            onStatusChange={handleStatusChange}
          />
        ) : (
          message && (
            <div className="flex justify-center items-center h-full">
              <p className="text-xl font-semibold text-gray-600 bg-gray-200 p-4 rounded-md shadow-md">
                {message}
              </p>
            </div>
          )
        )}
        <PolicyAddModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onAddPolicy={handleAddPolicy}
        />
      </div>
    </div>
  );
}
