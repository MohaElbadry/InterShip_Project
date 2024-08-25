import React, { useState } from "react";
import ReactDOM from "react-dom";
import PolicyDetailsModal from "./PolicyDetailsModal";
import PolicyStatusChangeModal from "./PolicyStatusChangeModal";
import { FaEye, FaEdit } from "react-icons/fa";

export default function PolicyRow({ policy, onStatusChange }) {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const handleDetailsModalOpen = () => setIsDetailsModalOpen(true);
  const handleDetailsModalClose = () => setIsDetailsModalOpen(false);

  const handleStatusModalOpen = () => setIsStatusModalOpen(true);
  const handleStatusModalClose = () => setIsStatusModalOpen(false);

  const getStatusColor = (status) => {
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
  };

  return (
    <>
      <tr className="bg-white border-b hover:bg-gray-50">
        <td className="px-6 py-4">{policy.user.name}</td>
        <td className="px-6 py-4">{`${policy.vehicle.make} ${policy.vehicle.model}`}</td>
        <td className="px-6 py-4">{policy.type}</td>
        <td className="px-6 py-4">
          {new Date(policy.start_date).toLocaleDateString()}
        </td>
        <td className="px-6 py-4">
          {new Date(policy.end_date).toLocaleDateString()}
        </td>
        <td className="px-6 py-4">${policy.amount.toFixed(2)}</td>
        <td className="px-6 py-4">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
              policy.status
            )}`}
          >
            {policy.status}
          </span>
        </td>
        <td className="px-6 py-4 text-right">
          <button
            onClick={handleDetailsModalOpen}
            className="text-blue-600 hover:text-blue-900 mr-2"
          >
            <FaEye size={20} />
          </button>
          <button
            onClick={handleStatusModalOpen}
            className="text-green-600 hover:text-green-900"
          >
            <FaEdit size={20} />
          </button>
        </td>
      </tr>
      {isDetailsModalOpen &&
        ReactDOM.createPortal(
          <PolicyDetailsModal
            policyId={policy.id}
            onClose={handleDetailsModalClose}
          />,
          document.body
        )}
      {isStatusModalOpen &&
        ReactDOM.createPortal(
          <PolicyStatusChangeModal
            policy={policy}
            onClose={handleStatusModalClose}
            onStatusChange={onStatusChange}
          />,
          document.body
        )}
    </>
  );
}
