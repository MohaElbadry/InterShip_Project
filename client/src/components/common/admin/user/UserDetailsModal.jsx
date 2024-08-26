import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

export default function UserDetailsModal({ userId, onClose }) {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_LINK}/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Failed to fetch user details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId, auth.token]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!userDetails) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto   flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold text-gray-800 ">User Details</h2>
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
              Personal Information
            </h3>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Name:</span> {userDetails.name}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Email:</span> {userDetails.email}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Role:</span> {userDetails.role}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Contact Information
            </h3>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Address:</span>{" "}
              {userDetails.address || "N/A"}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Contact Number:</span>{" "}
              {userDetails.contact_number || "N/A"}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Additional Information
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Date of Birth:</span>{" "}
              {userDetails.date_of_birth
                ? new Date(userDetails.date_of_birth).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
