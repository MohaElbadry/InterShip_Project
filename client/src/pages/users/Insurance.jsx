import React, { useEffect, useState } from "react";
import Menu from "../../components/layout/Menu";
import Sidebar from "../../components/layout/Sidebar";  
import InsuranceTable from "../../components/common/user/insurance/InsuranceTable";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function Insurance() {
  const { auth } = useAuth(); // Get the auth data from context
  const [insurances, setInsurance] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [message, setMessage] = useState("");

  useEffect(() => {
    const featchInsurance = async () => {
      try {
        // Fetch all Insurance for the user in reverse order
        const response = await axios.get(
          `${process.env.REACT_APP_API_LINK}/insurance/user/${auth.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.length > 0) {
          setInsurance(response.data); // Store all Insurance
        } else {
          setMessage("No Insurance found for this user.");
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setMessage("No Insurance found for this user.");
        } else {
          setMessage("An error occurred while fetching Insurance.");
        }
      } finally {
        setLoading(false); // Stop loading
      }
    };

    featchInsurance();
  }, []);

  if (loading) return <p>Loading...</p>; // Display loading message while fetching

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black">
      {/* Header */}
      <Menu />
      {/* ./Header */}
      <Sidebar />
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        {insurances && insurances.length > 0 ? (
          <InsuranceTable insurances={insurances} />
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
