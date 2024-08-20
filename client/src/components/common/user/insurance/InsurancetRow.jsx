import React from "react";

export default function InsuranceRow({ insurance }) {
  const getStatusLabel = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-200 text-green-700";
      case "expired":
        return "bg-red-200 text-red-700";
      case "cancelled":
        return "bg-yellow-200 text-yellow-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <tr className="bg-gray-50 border-b-2  text-center border-gray-200 hover:bg-gray-100 text-gray-700">
      <td className="px-4 py-3   text-base font-bold">
        {new Date(insurance.start_date).toDateString()} |{" "}
        {new Date(insurance.end_date).toDateString()}
      </td>
      <td className="px-4 py-3 text-sm">{insurance.policy_number}</td>
      <td className="px-4 py-3 text-sm">
        {insurance.vehicle.make} | {insurance.vehicle.model}
      </td>
      <td className="px-4 py-3 text-sm">{insurance.amount}</td>
      <td className="px-4 py-3 text-sm">
        <span
          className={`px-2 py-1 font-semibold leading-tight rounded-full ${getStatusLabel(
            insurance.status
          )}`}
        >
          {insurance.status}
        </span>
      </td>
    </tr>
  );
}
