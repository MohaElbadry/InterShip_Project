import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import { FaTimes } from "react-icons/fa";

export default function ClaimDetailsModal({ claimId, onClose }) {
  const [claimDetails, setClaimDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchClaimDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_LINK}/claim/${claimId}`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        setClaimDetails(response.data);
      } catch (error) {
        console.error("Error fetching claim details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClaimDetails();
  }, [claimId, auth.token]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!claimDetails) return null;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-400 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Claim Details</h2>
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
              Claim Information
            </h3>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Claim Number:</span>
              {claimDetails.claim_number}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Date Submitted:</span>
              {new Date(claimDetails.date_submitted).toLocaleDateString()}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Amount Claimed:</span> $
              {claimDetails.amount_claimed
                ? claimDetails.amount_claimed.toFixed(2)
                : "--:--"}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Status:</span>
              <span
                className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                  claimDetails.status
                )}`}
              >
                {claimDetails.status}
              </span>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              User Information
            </h3>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Name:</span>
              {claimDetails.user.name}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Email:</span>
              {claimDetails.user.email}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Accident Information
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Date:</span>
              {new Date(claimDetails.accident.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Description:</span>
              {claimDetails.accident.description}
            </p>
          </div>
        </div>
        {claimDetails.description && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Claim Description
            </h3>
            <p className="text-gray-600">{claimDetails.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
