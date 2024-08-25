import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import { FaTimes } from "react-icons/fa";

export default function PolicyDetailsModal({ policyId, onClose }) {
  const [policyDetails, setPolicyDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchPolicyDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_LINK}/insurance/${policyId}`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        setPolicyDetails(response.data);
      } catch (error) {
        console.error("Error fetching policy details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolicyDetails();
  }, [policyId, auth.token]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!policyDetails) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Policy Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Policy Information
            </h3>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Type:</span> {policyDetails.type}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Start Date:</span>{" "}
              {new Date(policyDetails.start_date).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">End Date:</span>{" "}
              {new Date(policyDetails.end_date).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Amount:</span> $
              {policyDetails.amount.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Status:</span>
              <span
                className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                  policyDetails.status
                )}`}
              >
                {policyDetails.status}
              </span>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              User Information
            </h3>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Name:</span>{" "}
              {policyDetails.user.name}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Email:</span>{" "}
              {policyDetails.user.email}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Vehicle Information
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Make:</span>{" "}
              {policyDetails.vehicle.make}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Model:</span>{" "}
              {policyDetails.vehicle.model}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Year:</span>{" "}
              {policyDetails.vehicle.year}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">License Plate:</span>{" "}
              {policyDetails.vehicle.license_plate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800";
    case "expired":
      return "bg-red-100 text-red-800";
    case "cancelled":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
}
