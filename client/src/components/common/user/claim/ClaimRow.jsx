import React from "react";

export default function ClaimRow({ claim }) {
  const formattedDate = new Date(claim.accident.date)
    .toISOString()
    .split("T")[0];
  return (
    <>
      <tr className="bg-gray-50 hover:bg-gray-100 text-gray-700">
        <td className="px-4 py-3 text-sm">{formattedDate}</td>
        <td className="px-4 py-3 text-sm">{claim.claim_number}</td>
        <td className="px-4 py-3 text-sm">{claim.date_submitted}</td>
        <td className="px-4 py-3 text-sm">
          <span
            className={`px-2 py-1 font-semibold leading-tight rounded-full ${
              (claim.status === "Approved") | (claim.status === "approved")
                ? "bg-green-200 text-green-700"
                : (claim.status === "Submitted") |
                  (claim.status === "submitted")
                ? "bg-blue-200 text-blue-700"
                : "bg-yellow-200 text-yellow-700"
            }`}
          >
            {claim.status}
          </span>
        </td>
        <td className="px-4 py-3 text-sm ">
          {claim.description.split(" ").slice(0, 6).join(" ") +
            (claim.description.split(" ").length > 6 ? "..." : "")}{" "}
        </td>
        <td className="px-4 py-3 text-sm">{claim.amount_claimed}</td>
      </tr>
    </>
  );
}
