import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "./ConfirmationModal"; // Import the ConfirmDeleteModal component
import VehicleRow from "./VehicleRow"; // Import VehicleRow component

export default function VehiclesTable({ vehicles, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleIdToDelete, setVehicleIdToDelete] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

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
        await onDelete(vehicleIdToDelete); // Perform the delete operation
        handleCloseModal(); // Close the modal
        navigate(-1); // Navigate back to the previous page
      } catch (error) {
        console.error("Error deleting vehicle:", error);
        // Optionally handle error
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
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
