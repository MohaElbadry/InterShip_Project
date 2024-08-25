import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

export default function PolicyStatusChangeModal({
  policy,
  onClose,
  onStatusChange,
}) {
  const [newStatus, setNewStatus] = useState(policy.status);
  const { auth } = useAuth();

  const handleStatusChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_LINK}/insurance/${policy.id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      toast.success("Policy status updated successfully!");
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error updating policy status:", error);
      toast.error("Failed to update policy status. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Change Policy Status
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <form onSubmit={handleStatusChange}>
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-gray-700 font-bold mb-2"
            >
              New Status
            </label>
            <select
              id="status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
