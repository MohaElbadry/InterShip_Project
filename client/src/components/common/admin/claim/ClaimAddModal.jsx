import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ClaimAddModal({ isOpen, onClose, onAddClaim }) {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [accidents, setAccidents] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("waiting"); // Default status
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "op1",
    },
  });

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

        const accidentsResponse = await axios.get(
          `${process.env.REACT_APP_API_LINK}/accident/`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setAccidents(accidentsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch users and accidents.");
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [auth.token, isOpen]);

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      user_id: parseInt(data.user_id, 10),
      accident_id: parseInt(data.accident_id, 10),
      amount_claimed: parseFloat(data.amount_claimed),
      date_submitted: new Date().toISOString(),
    };

    try {
      await onAddClaim(formattedData);
      reset();
      onClose();
      window.location.reload(); // Reload the page after successful submission
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add claim. Please try again.");
    }
  };

  // Handle status change
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
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
              Add New Claim
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <FaTimes size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="user_id"
                className="block text-sm font-medium text-gray-700"
              >
                User
              </label>
              <select
                {...register("user_id", { required: "User is required" })}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              {errors.user_id && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.user_id.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="accident_id"
                className="block text-sm font-medium text-gray-700"
              >
                Accident
              </label>
              <select
                {...register("accident_id", {
                  required: "Accident is required",
                })}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Accident</option>
                {accidents.map((accident) => (
                  <option key={accident.id} value={accident.id}>
                    {new Date(accident.date).toLocaleDateString()} -{" "}
                    {accident.description}
                  </option>
                ))}
              </select>
              {errors.accident_id && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.accident_id.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                {...register("status", { required: "Status is required" })}
                onChange={handleStatusChange} // Update status on change
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="op1"> -- Choose Your Option -- </option>
                <option value="waiting">Waiting</option>
                <option value="claimed">Claimed</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.status.message}
                </p>
              )}
            </div>
            {/* Conditionally render claim_number and amount_claimed */}
            {selectedStatus === "claimed" && (
              <>
                <div>
                  <label
                    htmlFor="claim_number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Claim Number
                  </label>
                  <input
                    type="text"
                    {...register("claim_number", {
                      required: "Claim number is required",
                    })}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.claim_number && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.claim_number.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="amount_claimed"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Amount Claimed
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("amount_claimed", {
                      required: "Amount claimed is required",
                    })}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.amount_claimed && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.amount_claimed.message}
                    </p>
                  )}
                </div>
              </>
            )}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                {...register("description")}
                rows={3}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="submit"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                Add Claim
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
