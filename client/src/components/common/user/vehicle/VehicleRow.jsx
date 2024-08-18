import React from "react";

export default function VehicleRow({ vehicle, onDelete }) {
  return (
    <tr className="text-gray-700 dark:text-gray-400">
      <td className="px-4 py-3">{/* Render vehicle picture */}</td>
      <td className="px-4 py-3">{vehicle.license_plate}</td>
      <td className="px-4 py-3">{vehicle.vin_number}</td>
      <td className="px-4 py-3">{vehicle.year}</td>
      <td className="px-4 py-3">
        <button onClick={onDelete} className="text-red-600 hover:text-red-800">
          Delete
        </button>
      </td>
    </tr>
  );
}
