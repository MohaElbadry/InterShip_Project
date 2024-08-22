import React from "react";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import img from "../../../../assets/verified.svg";
export default function ClaimRow({ claim, onUpdate }) {
  const { auth } = useAuth(); // Assuming you have authentication context
  const formattedDate = new Date(claim.accident.date)
    .toISOString()
    .split("T")[0];

  const handleConfirmClaim = async () => {
    try {
      const updatedClaim = {
        ...claim,
        status: "Claimed", // Update status to "Claimed"
      };
      await axios.patch(
        `${process.env.REACT_APP_API_LINK}/claim`,
        updatedClaim,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      onUpdate(updatedClaim); // Notify parent component to refresh the list
    } catch (error) {
      console.error("Error updating claim:", error);
    }
  };

  return (
    <>
      <tr className="bg-gray-50 text-center border-b-2 border-gray-200 hover:bg-gray-100 text-gray-700">
        <td className="px-4 py-3 text-base font-bold ">{formattedDate}</td>
        <td className=" py-3 text-sm">{claim.date_submitted}</td>
        <td className=" py-3 text-sm">
          <span
            className={`px-2 py-1 font-semibold leading-tight rounded-full ${
              claim.status === "Approved" || claim.status === "approved"
                ? "bg-green-200 text-green-700"
                : claim.status === "Submitted" || claim.status === "submitted"
                ? "bg-blue-200 text-blue-700"
                : claim.status === "Claimed"
                ? "bg-yellow-200 text-yellow-700"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {claim.status}
          </span>
        </td>
        <td className=" py-3 text-sm">
          {claim.description.split(" ").slice(0, 4).join(" ") +
            (claim.description.split(" ").length > 6 ? "..." : "")}{" "}
        </td>
        <td className=" py-3 text-sm">{claim.amount_claimed}</td>
        <td className=" py-3 text-sm">
          {(claim.status === "Approved") | (claim.status === "approved") ? (
            <button onClick={handleConfirmClaim} className="py-1 px-3 ">
              <img src={img} />
            </button>
          ) : (
            <></>
          )}
        </td>
      </tr>
    </>
  );
}
