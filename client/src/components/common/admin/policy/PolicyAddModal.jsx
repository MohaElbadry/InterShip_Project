import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import toast from "react-hot-toast";

const policyClasses = {
  "Class A": 209,
  "Class B": 3040,
  "Class C": 3550,
  "Class D": 4200,
  "Class E": 5200,
  "Class F": 6300,
};

export default function PolicyAddModal({ isOpen, onClose, onAddPolicy }) {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "active",
      type: "Class A",
      amount: 209,
    },
  });

  const selectedType = watch("type");

  useEffect(() => {
    setValue("amount", policyClasses[selectedType]);
  }, [selectedType, setValue]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(
          `${process.env.REACT_APP_API_LINK}/user/`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setUsers(usersResponse.data);

        const vehiclesResponse = await axios.get(
          `${process.env.REACT_APP_API_LINK}/vehicles/`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setVehicles(vehiclesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch users and vehicles.");
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [auth.token, isOpen]);

  const onSubmit = async (data) => {
    const formattedData = {
      user_id: parseInt(data.user_id, 10),
      vehicle_id: parseInt(data.vehicle_id, 10),
      type: data.type,
      start_date: new Date(data.start_date).toISOString(),
      end_date: new Date(data.end_date).toISOString(),
      amount: parseFloat(data.amount),
      status: data.status,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_LINK}/insurance`,
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      onClose();
      toast.success("Policy added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error:", error.response?.data?.error || error.message);
      toast.error("Failed to add policy. Please try again.");
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Add New Policy
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <select
              {...register("user_id", { required: "User is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {errors.user_id && (
              <p className="text-red-600">{errors.user_id.message}</p>
            )}

            <select
              {...register("vehicle_id", { required: "Vehicle is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Vehicle</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.make} {vehicle.model}
                </option>
              ))}
            </select>
            {errors.vehicle_id && (
              <p className="text-red-600">{errors.vehicle_id.message}</p>
            )}

            <select
              {...register("type", { required: "Type is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {Object.keys(policyClasses).map((classType) => (
                <option key={classType} value={classType}>
                  {classType}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-red-600">{errors.type.message}</p>
            )}

            <input
              type="date"
              {...register("start_date", {
                required: "Start date is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.start_date && (
              <p className="text-red-600">{errors.start_date.message}</p>
            )}

            <input
              type="date"
              {...register("end_date", { required: "End date is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.end_date && (
              <p className="text-red-600">{errors.end_date.message}</p>
            )}

            <input
              type="number"
              {...register("amount", { required: "Amount is required" })}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
            {errors.amount && (
              <p className="text-red-600">{errors.amount.message}</p>
            )}

            <input type="hidden" {...register("status")} value="active" />

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
