import React, { useEffect, useState } from "react";
import Menu from "../../components/common/user/Menu";
import Sidebar from "../../components/common/user/Sidebar";
import InsuranceTable from "../../components/common/user/insurance/InsuranceTable";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import InsuranceAddModal from "../../components/common/user/insurance/InsuranceAddModal";
import icon from "../../assets/plus_round_icon.svg";

export default function Insurance() {
  const { auth } = useAuth(); // Get the auth data from context
  const [Insurance, Ietinsurance] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const Ietchinsurance = async () => {
      try {
        // Fetch all Insurance for the user in reverse order
        const response = await axios.get(
          `${process.env.REACT_APP_API_LINK}/user/insurance/${auth.user.id}`
        );
        if (response.data.length > 0) {
          Ietinsurance(response.data); // Store all Insurance
        } else {
          setMessage("No Insurance found for this user.");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setMessage("No Insurance found for this user.");
        } else {
          setMessage("An error occurred while fetching Insurance.");
        }
      } finally {
        setLoading(false); // Stop loading
      }
    };

    Ietchinsurance();
  }, []);

  if (loading) return <p>Loading...</p>; // Display loading message while fetching

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black">
      {/* Header */}
      <Menu />
      {/* ./Header */}
      <Sidebar />
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <div>
          <button
            onClick={openModal}
            className="bg-[#F7BB00] mt-4  font-bold py-2 px-2 ml-4 rounded-full "
          >
            <img src={icon} alt="logo" className="w-4 " />
          </button>

          {/* The modal component */}
          <insuranceAddModal isOpen={isModalOpen} onClose={closeModal} />
        </div>{" "}
        {Insurance && Insurance.length > 0 ? (
          <InsuranceTable Insurance={Insurance} />
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
