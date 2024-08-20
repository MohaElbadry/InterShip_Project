import React from "react";
import InsurancetRow from "./InsurancetRow";

export default function InsuranceTable({ insurances }) {
  return (
    <div className="mt-4 rounded-lg mx-5 overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="px-4 py-3">Date Start | End</th>
            <th className="px-4 py-3">Policy Number</th>
            <th className="px-4 py-3">Vehicle</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {insurances.map((insurance) => (
            <InsurancetRow key={insurance.id} insurance={insurance} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
