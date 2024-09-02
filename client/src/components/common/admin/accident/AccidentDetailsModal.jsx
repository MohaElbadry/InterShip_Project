import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";

export default function AccidentDetailsModal({ accidentId, onClose }) {
  const [accidentDetails, setAccidentDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();
  useEffect(() => {
    const fetchAccidentDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_LINK}/accident/${accidentId}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setAccidentDetails(response.data);
      } catch (error) {
        console.error("Error fetching accident details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccidentDetails();
  }, [accidentId]);

  if (isLoading) {
    return (
      <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!accidentDetails) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Accident on{" "}
            {new Date(accidentDetails.accident.date).toLocaleDateString()}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mb-4">
          <p className="text-gray-600">
            <strong>Location:</strong> {accidentDetails.accident.location}
          </p>
          <p className="text-gray-600 mt-2">
            <strong>Description:</strong> {accidentDetails.accident.description}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Vehicles Involved:
          </h3>
          <ul className="space-y-2">
            {accidentDetails.vehicles.map((vehicle) => (
              <li
                key={vehicle.id}
                className="bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <span className="font-medium">
                  {vehicle.make} {vehicle.model}
                </span>{" "}
                - {vehicle.license_plate}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
