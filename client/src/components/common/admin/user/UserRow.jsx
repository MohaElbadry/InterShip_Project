import React, { useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import UserDetailsModal from "./UserDetailsModal";
import UserUpdateModal from "./UserUpdateModal";
import ReactDOM from "react-dom";

export default function UserRow({ user }) {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleDetailsModalOpen = () => setIsDetailsModalOpen(true);
  const handleDetailsModalClose = () => setIsDetailsModalOpen(false);

  const handleUpdateModalOpen = () => setIsUpdateModalOpen(true);
  const handleUpdateModalClose = () => setIsUpdateModalOpen(false);

  return (
    <>
      <tr className="bg-white border-b hover:bg-gray-50">
        <td className="px-6 py-4">{user.name}</td>
        <td className="px-6 py-4">{user.email}</td>
        <td className="px-6 py-4">{user.role}</td>
        <td className="px-6 py-4 text-right">
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
        </td>
      </tr>
      {isDetailsModalOpen &&
        ReactDOM.createPortal(
          <UserDetailsModal
            userId={user.id}
            onClose={handleDetailsModalClose}
          />,
          document.body
        )}
      {isUpdateModalOpen &&
        ReactDOM.createPortal(
          <UserUpdateModal
            user={user}
            onClose={handleUpdateModalClose}
          />,
          document.body
        )}
    </>
  );
}
