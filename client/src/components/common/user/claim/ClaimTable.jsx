import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VehicleRow from "./ClaimRow"; // Import VehicleRow component

export default function VehiclesTable({ vehicles }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleIdToDelete, setVehicleIdToDelete] = useState(null);

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
        const response = await fetch(
          `${process.env.REACT_APP_API_LINK}/vehicles/${vehicleIdToDelete}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          handleCloseModal(); // Close the modal
          location.reload();
        } else {
          console.error("Failed to delete the vehicle");
        }
      } catch (error) {
        console.error("Error deleting vehicle:", error);
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
    </div>
  );
}
