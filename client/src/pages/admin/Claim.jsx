import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import MenuDark from "../../components/layout/MenuDark";
import SidebarDark from "../../components/layout/SidebarDark";
import ClaimTable from "../../components/common/admin/claim/ClaimTable";
import ClaimAddModal from "../../components/common/admin/claim/ClaimAddModal";
import icon from "../../assets/plus_round_icon.svg";
import toast from "react-hot-toast";

export default function Claim() {
  const { auth } = useAuth();
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchClaims = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_LINK}/claim/`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const reversedClaims = response.data.reverse();
      if (reversedClaims.length > 0) {
        setClaims(reversedClaims);
      } else {
        setMessage("No claims found.");
      }
    } catch (error) {
      console.error("Error fetching claims:", error);
      setMessage("An error occurred while fetching claims.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, [auth.token]);

  const handleAddClaim = async (newClaim) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_LINK}/claim/`,
        newClaim,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setClaims((prevClaims) => [response.data, ...prevClaims]);
      toast.success("Claim added successfully!");
      closeModal();
    } catch (error) {
      console.error("Error adding claim:", error);
      toast.error("Failed to add claim. Please try again.");
    }
  };

  const handleUpdateClaim = async (updatedClaim) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_LINK}/claim/`,
        updatedClaim,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setClaims((prevClaims) =>
        prevClaims.map((claim) =>
          claim.id === updatedClaim.id ? response.data : claim
        )
      );
      toast.success("Claim updated successfully!");
    } catch (error) {
      console.error("Error updating claim:", error);
      toast.error("Failed to update claim. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-700 text-black">
      <MenuDark />
      <SidebarDark />
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <div>
          <button
            onClick={openModal}
            className="bg-[#F7BB00] my-4 font-bold py-2 px-2 ml-4 rounded-full"
          >
            <img src={icon} alt="Add" className="w-4" />
          </button>
          <ClaimAddModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onAddClaim={handleAddClaim}
          />
        </div>
        {claims && claims.length > 0 ? (
          <ClaimTable claims={claims} onUpdateClaim={handleUpdateClaim} />
        ) : (
          message && (
            <div className="flex justify-center items-center h-full">
              <p className="text-xl font-semibold text-gray-600 bg-gray-200 p-4 rounded-md shadow-md">
                {message}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
