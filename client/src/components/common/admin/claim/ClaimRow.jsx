import React, { useState } from "react";
import ReactDOM from "react-dom";
import ClaimDetailsModal from "./ClaimDetailsModal";
import ClaimUpdateModal from "./ClaimUpdateModal";
import { FaEye, FaEdit } from "react-icons/fa";

export default function ClaimRow({ claim, onUpdateClaim }) {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleDetailsModalOpen = () => setIsDetailsModalOpen(true);
  const handleDetailsModalClose = () => setIsDetailsModalOpen(false);

  const handleUpdateModalOpen = () => setIsUpdateModalOpen(true);
  const handleUpdateModalClose = () => setIsUpdateModalOpen(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "claimed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "approved":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <>
      <tr className="bg-white border-b hover:bg-gray-50">
        {claim.claim_number ? (
          <td className="px-6 py-4">{claim.claim_number}</td>
        ) : (
          <td className="px-6 py-4">--:--</td>
        )}{" "}
        <td className="px-6 py-4">
          {claim.user && claim.user.name ? claim.user.name : "N/A"}
        </td>
        <td className="px-6 py-4">
          {new Date(claim.date_submitted).toLocaleDateString()}
        </td>
        <td className="px-6 py-4">
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
              claim.status
            )}`}
          >
            {claim.status}
          </span>
        </td>
        <td className="px-6 py-4">
          ${claim.amount_claimed ? claim.amount_claimed.toFixed(2) : "--:--"}
        </td>
        <td className="px-6 py-4 text-right">
          {claim.status !== "rejected" && claim.status !== "claimed" ? ( // Corrected condition
            <div className="flex flex-row">
              <button
                onClick={handleDetailsModalOpen}
                className="text-blue-600 hover:text-blue-900 mr-2"
              >
                <FaEye size={20} />
              </button>
              <button
                onClick={handleUpdateModalOpen}
                className="text-green-600 hover:text-green-900"
              >
                <FaEdit size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleDetailsModalOpen}
              className="text-blue-600 hover:text-blue-900 mr-2"
            >
              <FaEye size={20} />
            </button>
          )}
        </td>
      </tr>
      {isDetailsModalOpen &&
        ReactDOM.createPortal(
          <ClaimDetailsModal
            claimId={claim.id}
            onClose={handleDetailsModalClose}
          />,
          document.body
        )}
      {isUpdateModalOpen &&
        ReactDOM.createPortal(
          <ClaimUpdateModal
            claim={claim}
            onClose={handleUpdateModalClose}
            onUpdateClaim={onUpdateClaim}
          />,
          document.body
        )}
    </>
  );
}
