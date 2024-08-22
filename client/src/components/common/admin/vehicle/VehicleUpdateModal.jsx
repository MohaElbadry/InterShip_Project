import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import toast from "react-hot-toast";

export default function VehicleUpdateModal({ isOpen, vehicle, onClose }) {
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    license_plate: "",
    vin_number: "",
  });

  useEffect(() => {
    if (vehicle) {
      setFormData({
        make: vehicle.make || "",
        model: vehicle.model || "",
        year: vehicle.year || "",
        license_plate: vehicle.license_plate || "",
        vin_number: vehicle.vin_number || "",
      });
    }
  }, [vehicle]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_LINK}/vehicles/${vehicle.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Vehicle updated successfully!");
        onClose(); // Close modal on success
        window.location.reload(); // Reload the page
      } else {
        toast.error("Failed to update the vehicle");
      }
    } catch (error) {
      toast.error(
        "Error updating vehicle: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
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
              Update Vehicle
            </h3>
            <button
              onClick={onClose}
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
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor="make"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Make
                  </label>
                  <input
                    type="text"
                    id="make"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    className="mt-1 block text-black w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="model"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Model
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="year"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Year
                  </label>
                  <input
                    id="year"
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="license_plate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    License Plate
                  </label>
                  <input
                    type="text"
                    id="license_plate"
                    name="license_plate"
                    value={formData.license_plate}
                    onChange={handleChange}
                    className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="vin_number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    VIN Number
                  </label>
                  <input
                    type="text"
                    id="vin_number"
                    name="vin_number"
                    value={formData.vin_number}
                    onChange={handleChange}
                    className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
