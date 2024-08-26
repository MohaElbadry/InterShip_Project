import React, { useState } from "react";
import ClaimRow from "./ClaimRow";
import { FaSearch } from "react-icons/fa";

export default function ClaimTable({ claims, onUpdateClaim }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClaims = claims.filter(
    (claim) =>
      claim.claim_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="m-4">
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
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Claim Number
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Date Submitted
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Amount Claimed
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredClaims.map((claim) => (
              <ClaimRow
                key={claim.id}
                claim={claim}
                onUpdateClaim={onUpdateClaim}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
