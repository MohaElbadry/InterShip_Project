import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";

export default function AccidentAddModal({ isOpen, onClose }) {
  const { auth } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (auth.user) {
      const fetchVehicles = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_LINK}/vehicles/user/${auth.user.id}`,
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            }
          );
          setVehicles(response.data);
        } catch (error) {
          console.error("Error fetching vehicles:", error.response.data.error);
        }
      };

      fetchVehicles();
    }
  }, [auth.user, auth.token]);

  const onSubmit = async (data) => {
    const formattedData = {
      user_id: parseInt(auth.user.id, 10),
      date: new Date(data.date).toISOString(),
      location: data.location,
      description: data.description,
    };

    try {
      // Create new accident
      const accidentResponse = await axios.post(
        `${process.env.REACT_APP_API_LINK}/accident`,
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      const accidentId = accidentResponse.data.id;

      if (selectedVehicle) {
        // Create accident-vehicle relation
        await axios.post(
          `${process.env.REACT_APP_API_LINK}/accident-vehicle`,
          {
            accident_id: accidentId,
            vehicle_id: selectedVehicle,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
      }

      reset();
      onClose();
    } catch (error) {
      console.error("Error:", error.response.data.error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 z-10 overflow-y-auto">
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
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Add New Accident
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
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
            <input
              type="date"
              name="date"
              {...register("date", { required: "Date is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.date && (
              <p className="text-red-600">{errors.date.message}</p>
            )}

            <input
              type="text"
              name="location"
              placeholder="Location"
              {...register("location", { required: "Location is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.location && (
              <p className="text-red-600">{errors.location.message}</p>
            )}

            <textarea
              name="description"
              placeholder="Description"
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.description && (
              <p className="text-red-600">{errors.description.message}</p>
            )}

            <select
              name="vehicle"
              onChange={(e) => setSelectedVehicle(parseInt(e.target.value, 10))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              defaultValue=""
            >
              <option value="" disabled>
                Select Vehicle
              </option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.make} {vehicle.model}
                </option>
              ))}
            </select>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
