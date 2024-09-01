import React, { useState } from "react";
import VehicleRow from "./VehicleRow"; // Import VehicleRow component
import { useAuth } from "../../../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast"; // Import react-hot-toast

export default function VehiclesTable({ vehicles }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleIdToDelete, setVehicleIdToDelete] = useState(null);
  const { auth } = useAuth();

  const handleOpenModal = (id) => {
    setVehicleIdToDelete(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setVehicleIdToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (vehicleIdToDelete !== null) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_LINK}/vehicles/${vehicleIdToDelete}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        if (response.status === 200) {
          handleCloseModal(); // Close the modal
          toast.success("Vehicle deleted successfully!");
          location.reload();
        } else if (response.status === 400) {
          handleCloseModal(); // Close the modal
          console.log("ana hna ");
        } else {
          toast.error("Failed to delete the vehicle");
        }
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              toast.error(
                "Vehicle cannot be deleted.\n It might be referenced in another table."
              );
              location.reload();
              break;
            case 404:
              toast.error("Vehicle not found.");
              break;
            default:
              toast.error("An error occurred while deleting the vehicle.");
          }
        } else {
          toast.error("Network error.");
        }
      }
    }
  };

  return (
    <div className="mt-4 mx-4">
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                <th className="px-4 py-3">Picture</th>
                <th className="px-4 py-3">License Plate</th>
                <th className="px-4 py-3">VIN Number</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {vehicles.map((vehicle) => (
                <VehicleRow
                  key={vehicle.id}
                  vehicle={vehicle}
                  onDelete={() => handleOpenModal(vehicle.id)} // Pass handler to VehicleRow
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Render the modal outside of the table structure */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4">
            <h2 className="text-lg font-bold">Confirm Delete</h2>
            <p>Are you sure you want to delete this vehicle?</p>
            <div className="flex justify-end mt-4">
              <button onClick={handleCloseModal} className="mr-2">
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <Toaster /> Add Toaster component to render notifications */}
    </div>
  );
}
