import React, { useState } from "react";
import AccidentRow from "./AccidentRow";
import { FaSearch } from "react-icons/fa";

export default function AccidentTable({ accidents }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAccident = accidents.filter(
    (accident) =>
      accident.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accident.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="mx-0 first-letter:sm:mx-4 rounded-lg overflow-x-auto">
      <div className="mb-4 flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search claims..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <table className="min-w-full bg-white sm:rounded-lg">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">View More</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {filteredAccident.map((accident) => (
            <AccidentRow key={accident.id} accident={accident} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
