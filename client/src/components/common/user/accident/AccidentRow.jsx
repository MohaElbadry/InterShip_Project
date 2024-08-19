import React from "react";

export default function AccidentRow({ accident }) {
  return (
    <tr className="bg-gray-50 border-b-2 border-gray-200 hover:bg-gray-100 text-gray-700">
      <td className="px-4 py-3 text-sm">
        {new Date(accident.date).toDateString()}
      </td>
      <td className="px-4 py-3 text-sm">{accident.location}</td>
      <td className="px-4 py-3 text-sm">
        {accident.description.split(" ").slice(0, 9).join(" ")}...
      </td>
    </tr>
  );
}
