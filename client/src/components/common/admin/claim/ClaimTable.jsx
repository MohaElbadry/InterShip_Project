import React, { useState, useEffect } from "react";
import axios from "axios";
import ClaimRow from "./ClaimRow";
import { useAuth } from "../../../../context/AuthContext";

export default function ClaimTable() {
  const { auth } = useAuth();
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_LINK}/claim/user/${auth.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setClaims(response.data);
      } catch (error) {
        console.error("Error fetching claims:", error);
      }
    };
    fetchClaims();
  }, [auth.token]);

  const handleClaimUpdate = (updatedClaim) => {
    setClaims((prevClaims) =>
      prevClaims.map((claim) =>
        claim.id === updatedClaim.id ? updatedClaim : claim
      )
    );
  };

  return (
    <div className="min-w-full bg-white">
      <table className=" w-full   rounded-lg">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className=" py-2">Date</th>
            <th className=" py-2">Date Submitted</th>
            <th className=" py-2">Status</th>
            <th className=" py-2">Description</th>
            <th className=" py-2">Amount Claimed</th>
            <th className=" py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <ClaimRow
              key={claim.id}
              claim={claim}
              onUpdate={handleClaimUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
