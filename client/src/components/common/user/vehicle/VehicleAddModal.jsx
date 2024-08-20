import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";

export default function VehicleAddModal({ isOpen, onClose }) {
  const { auth } = useAuth(); // Get the auth data from context
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formattedData = {
      user_id: parseInt(auth.user.id, 10), // Ensure user_id is an integer
      make: data.make,
      model: data.model,
      year: parseInt(data.year, 10), // Ensure year is an integer
      license_plate: data.license_plate,
      vin_number: data.vin_number,
    };

    const formData = new FormData();
    for (const key in formattedData) {
      formData.append(key, formattedData[key]);
    }

    if (data.picture && data.picture[0]) {
      formData.append("picture", data.picture[0]); // Append the file
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_LINK}/vehicles`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      reset();
      onClose(); // Close the modal after successful submission
      window.location.reload(); // Reload the page after successful submission
    } catch (error) {
      console.error("Error:", error.response.data.error);
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
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Add New Vehicle
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
              type="text"
              name="make"
              placeholder="Make"
              {...register("make", { required: "Make is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.make && (
              <p className="text-red-600">{errors.make.message}</p>
            )}

            <input
              type="text"
              name="model"
              placeholder="Model"
              {...register("model", { required: "Model is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.model && (
              <p className="text-red-600">{errors.model.message}</p>
            )}

            <input
              type="number"
              name="year"
              placeholder="Year"
              {...register("year", { required: "Year is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.year && (
              <p className="text-red-600">{errors.year.message}</p>
            )}

            <input
              type="text"
              name="license_plate"
              placeholder="License Plate"
              {...register("license_plate", {
                required: "License Plate is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.license_plate && (
              <p className="text-red-600">{errors.license_plate.message}</p>
            )}

            <input
              type="text"
              name="vin_number"
              placeholder="VIN Number"
              {...register("vin_number", {
                required: "VIN Number is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.vin_number && (
              <p className="text-red-600">{errors.vin_number.message}</p>
            )}

            <input
              type="file"
              name="picture"
              {...register("picture")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />

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
