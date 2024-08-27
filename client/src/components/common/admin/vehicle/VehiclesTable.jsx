import React, { useState } from "react";
import VehicleRow from "./VehicleRow";
import { useAuth } from "../../../../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

export default function VehiclesTable({ vehicles }) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [vehicleIdToDelete, setVehicleIdToDelete] = useState(null);
  const { auth } = useAuth();

  const handleOpenDeleteModal = (id) => {
    setVehicleIdToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
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
          toast.success("Vehicle deleted successfully!");
          setDeleteModalOpen(false); // Close modal on success
          // Refresh the page or update the vehicle list here
          window.location.reload(); // Refresh the page after deletion
        } else {
          toast.error("Failed to delete the vehicle");
        }
      } catch (error) {
        toast.error("Error deleting vehicle: " + error.message);
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
                  onDelete={() => handleOpenDeleteModal(vehicle.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Confirm Delete
                </h3>
                <button
                  onClick={handleCloseDeleteModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this vehicle? This action
                  cannot be undone.
                </p>
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={handleCloseDeleteModal}
                  className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}