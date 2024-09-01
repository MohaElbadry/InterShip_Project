import React from "react";
import PolicyRow from "./PolicyRow";

export default function PolicyTable({ policies, onStatusChange }) {
  return (
    <div className="mt-4 mx-0 sm:mx-4 overflow-none">
      <div className="w-full overflow-x-auto">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Vehicle</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Start Date</th>
                <th className="px-6 py-3">Start Date</th>
                <th className="px-6 py-3">Start Date</th>
                <th className="px-6 py-3">Start Date</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy) => (
                <PolicyRow
                  key={policy.id}
                  policy={policy}
                  onStatusChange={onStatusChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
