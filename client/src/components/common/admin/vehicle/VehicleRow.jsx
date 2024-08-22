import React, { useState } from "react";
import VehicleUpdateModal from "./VehicleUpdateModal";
import DeleteButton from "./DeleteButton"; // Placeholder for DeleteButton if needed

export default function VehicleRow({ vehicle, onDelete }) {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  return (
    <>
      <tr className="bg-gray-800 hover:bg-gray-700 text-white">
        <td className="px-4 py-3">
          <div className="flex items-center text-sm">
            <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
              <img
                className="object-cover w-full h-full rounded-full"
                src={`${process.env.REACT_APP_API_LINK}${vehicle.picture_url}`}
                loading="lazy"
                alt={`Picture of ${vehicle.make} ${vehicle.model}`}
              />
              <div
                className="absolute inset-0 rounded-full shadow-inner"
                aria-hidden="true"
              ></div>
            </div>
            <div>
              <p className="font-semibold">{vehicle.make}</p>
              <p className="text-xs text-gray-400">{vehicle.model}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">{vehicle.license_plate}</td>
        <td className="px-4 py-3 text-xs">
          <span className="px-2 py-1 font-semibold leading-tight text-gray-400 rounded-full">
            {vehicle.vin_number}
          </span>
        </td>
        <td className="px-4 py-3 text-sm">{vehicle.year}</td>
        <td className="px-4 py-3 text-sm">
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
          <button
            onClick={() => setUpdateModalOpen(true)}
            className="text-yellow-400 hover:text-yellow-500 ml-4"
          >
            Update
          </button>
          <VehicleUpdateModal
            isOpen={isUpdateModalOpen}
            vehicle={vehicle}
            onClose={() => setUpdateModalOpen(false)}
          />
        </td>
      </tr>
    </>
  );
}
