import React, { useEffect, useState } from "react";
import Menu from "../../components/common/user/Menu";
import Sidebar from "../../components/common/user/Sidebar";
import ClaimTable from "../../components/common/user/claim/ClaimTable";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import VehicleAddModal from "../../components/common/user/claim/ClaimAddModal";
import icon from "../../assets/plus_round_icon.svg";

export default function Claim() {
  const { auth } = useAuth(); // Get the auth data from context
  const [Claim, setClaim] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
     const fetchClaim = async () => {
       try {
         // Fetch all Claim for the user in reverse order
         const response = await axios.get(
           `${process.env.REACT_APP_API_LINK}/user/vehicle/${auth.user.id}`
         );
         if (response.data.length > 0) {
           setClaim(response.data); // Store all Claim
           setLatestVehicle(response.data[0]); // Set the first vehicle as the latest
         } else {
           setMessage("No Claim found for this user.");
         }
       } catch (error) {
         if (error.response && error.response.status === 404) {
           setMessage("No Claim found for this user.");
         } else {
           setMessage("An error occurred while fetching Claim.");
         }
       } finally {
         setLoading(false); // Stop loading
       }
     };

    fetchClaim();
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
          <VehicleAddModal isOpen={isModalOpen} onClose={closeModal} />
        </div>{" "}
        {Claim && Claim.length > 0 ? (
          <ClaimTable Claim={Claim} />
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
