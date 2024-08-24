import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import MenuDark from "../../components/layout/MenuDark";
import SidebarDark from "../../components/layout/SidebarDark";
// import
import AccidentTable from "../../components/common/admin/accident/AccidentTable";
import AccidentAddModal from "../../components/common/admin/accident/AccidentAddModal";
import icon from "../../assets/plus_round_icon.svg";

export default function Accidents() {
  const { auth } = useAuth(); // Get the auth data from context
  const [accidents, setAccidents] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetcAccidents = async () => {
      try {
        // Fetch all vehicles for the user in reverse order
        const response = await axios.get(
          `${process.env.REACT_APP_API_LINK}/accident/`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        const reversedAccidents = response.data.reverse();

        if (reversedAccidents.length > 0) {
          setAccidents(reversedAccidents); // Store all vehicles
        } else {
          setMessage("No Accidents found for this user.");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setMessage("No Accidents found for this user.");
        } else {
          setMessage("An error occurred while fetching Accidents.");
        }
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetcAccidents();
  }, []);

  if (loading) return <p>Loading...</p>; // Display loading message while fetching

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-700  text-black">
      {/* Header */}
      <MenuDark />
      {/* ./Header */}
      <SidebarDark />
      {/* <!-- Statistics Cards --> */}
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <div>
          <button
            onClick={openModal}
            className="bg-[#F7BB00] my-4  font-bold py-2 px-2 ml-4 rounded-full "
          >
            <img src={icon} alt="logo" className="w-4 " />
          </button>

          {/* The modal component */}
          <AccidentAddModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
        {accidents && accidents.length > 0 ? (
          <AccidentTable accidents={accidents} />
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
