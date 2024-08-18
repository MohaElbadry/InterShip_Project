import React, { useEffect, useState } from "react";
import Menu from "../../components/common/user/Menu";
import Sidebar from "../../components/common/user/Sidebar";
import VehiclesTable from "../../components/common/user/vehicle/VehiclesTable";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import VehicleAddModal from "../../components/common/user/vehicle/VehicleAddModal";
import icon from "../../assets/plus_round_icon.svg";

export default function Vehicles() {
  const { auth } = useAuth(); // Get the auth data from context
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_LINK}/user/vehicle/${auth.user.id}`
        );
        if (response.data.length > 0) {
          setVehicles(response.data);
        } else {
          setMessage("No vehicles found for this user.");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setMessage("No vehicles found for this user.");
        } else {
          setMessage("An error occurred while fetching vehicles.");
        }
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchVehicles();
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
        {vehicles && vehicles.length > 0 ? (
          <VehiclesTable vehicles={vehicles} />
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
