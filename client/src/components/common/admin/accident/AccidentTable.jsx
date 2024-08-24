import React from "react";
import AccidentRow from "./AccidentRow";

export default function AccidentTable({ accidents }) {
  return (
    <div className="rounded-lg mx-5 overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">View More</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {accidents.map((accident) => (
            <AccidentRow key={accident.id} accident={accident} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
