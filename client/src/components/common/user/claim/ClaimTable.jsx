import React from "react";
import ClaimRow from "./ClaimRow";

export default function ClaimTable({ claims, onUpdateClaim }) {
  return (
    <div className="min-w-full bg-white">
      <table className="w-full rounded-lg">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-2">Claim Number</th>
            <th className="py-2">Date Submitted</th>
            <th className="py-2">Last Update</th>
            <th className="py-2">Status</th>
            <th className="py-2">Amount Claimed</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <ClaimRow
              key={claim.id}
              claim={claim}
              onUpdateClaim={onUpdateClaim} // Pass the onUpdateClaim function
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
