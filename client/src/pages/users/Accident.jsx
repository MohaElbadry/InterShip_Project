import React, { useEffect, useState } from "react";
import Menu from "../../components/common/user/Menu";
import Sidebar from "../../components/common/user/Sidebar";
import AccidentTable from "../../components/common/user/accident/AccidentTable";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import AccidentAddModal from "../../components/common/user/accident/AccidentAddModal";
import icon from "../../assets/plus_round_icon.svg";

export default function Accident() {
  const { auth } = useAuth(); // Get the auth data from context
  const [accidents, setAccidents] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchAccidents = async () => {
      try {
        // Fetch all accidents for the userconsole.log(response);
        const response = await axios.get(
          `${process.env.REACT_APP_API_LINK}/accident/user/${auth.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        if (response.data.length > 0) {
          setAccidents(response.data); // Store all accidents
        } else {
          setMessage("No accidents found for this user.");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setMessage("No accidents found for this user.");
        } else {
          setMessage("An error occurred while fetching accidents.");
        }
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchAccidents();
  }, [auth.user.id]);

  if (loading) return <p>Loading...</p>; // Display loading message while fetching

  return (
    <div className="min-h-screen  flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black">
      {/* Header */}
      <Menu />
      {/* Sidebar */}
      <Sidebar />
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <div>
          <button
            onClick={openModal}
            className="bg-[#F7BB00] my-4 font-bold py-2 px-2 ml-4 rounded-full "
          >
            <img src={icon} alt="logo" className="w-4 " />
          </button>

          {/* AccidentAddModal */}
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
