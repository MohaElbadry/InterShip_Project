import React, { useEffect, useState } from "react";
import Menu from "../../components/layout/Menu";
import Sidebar from "../../components/layout/Sidebar";
import ClaimTable from "../../components/common/user/claim/ClaimTable";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function Claim() {
  const { auth } = useAuth(); // Get the auth data from context
  const [Claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchClaim = async () => {
      try {
        // Fetch all Claim for the user in reverse order
        const response = await axios.get(
          `${process.env.REACT_APP_API_LINK}/claim/user/${auth.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        if (response.data.length > 0) {
          setClaims(response.data); // Store all Claim
        } else {
          setMessage("No Claim found for this user.");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setMessage("No Claim found for this user.");
        } else {
          setMessage("An error occurred while fetching Claim.");
        }
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchClaim();
  }, []);

  if (loading) return <p>Loading...</p>; // Display loading message while fetching

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black">
      {/* Header */}
      <Menu />
      {/* ./Header */}
      <Sidebar />
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        {Claims && Claims.length > 0 ? (
          <ClaimTable claims={Claims} />
        ) : (
          message && (
            <div className="flex justify-center items-center h-full">
              <p className="text-xl font-semibold text-gray-600 bg-gray-200 p-4 rounded-md shadow-md">
                {message}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
