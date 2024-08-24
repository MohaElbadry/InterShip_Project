import React, { useState } from "react";
import ReactDOM from "react-dom";
import AccidentDetailsModal from "./AccidentDetailsModal";

export default function AccidentRow({ accident }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <tr className="bg-gray-50 text-center border-b-2 border-gray-200 hover:bg-gray-100 text-gray-700">
        <td className="px-6 py-3 text-base font-bold">
          {new Date(accident.date).toDateString()}
        </td>
        <td className="px-4 py-3 text-sm">{accident.location}</td>
        <td className="px-4 py-3 text-sm">
          {accident.description.split(" ").slice(0, 9).join(" ")}...
        </td>
        <td className="px-4 py-3 text-sm">
          <button
            className="text-blue-500 hover:underline"
            onClick={handleModalOpen}
          >
            Show More
          </button>
        </td>
      </tr>
      {isModalOpen &&
        ReactDOM.createPortal(
          <AccidentDetailsModal
            accidentId={accident.id}
            onClose={handleModalClose}
          />,
          document.body // Mount the modal in the body
        )}
    </>
  );
}
