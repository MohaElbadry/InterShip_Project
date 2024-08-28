import React, { useEffect, useState } from "react";
import Menu from "../../components/layout/Menu";
import StatisticsCard from "./StatisticsCard";
import Sidebar from "../../components/layout/Sidebar";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import WebsiteInfo from "../../components/common/user/WebsiteInfo"; // Import the new component

export default function UserDashboard() {
  const { auth } = useAuth(); // Get the auth data from context
  const [latestVehicles, setLatestVehicles] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // Fetch all vehicles for the user in reverse order
        const response = await axios.get(
          `${process.env.REACT_APP_API_LINK}/vehicles/user/${auth.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        if (response.data.length > 0) {
          setLatestVehicles(response.data[0]); // Set the first vehicle as the latest
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    const fetchUserStatistics = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_LINK}/statistics/user/${auth.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setStatistics(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user statistics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
    fetchUserStatistics();
  }, [auth.token]);
  if (loading) return <p>Loading...</p>; // Display loading message while fetching

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black">
      {/* Header */}
      <Menu />
      {/* ./Header */}
      <Sidebar />
      {/* <!-- Statistics Cards --> */}
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
          <StatisticsCard
            bgColor="blue-500"
            borderColor="blue-600"
            icon={
              <svg
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            }
            value={statistics.userVehiclesCount}
            label="Vehicles"
          />
          <StatisticsCard
            bgColor="blue-500"
            borderColor="blue-600"
            icon={
              <svg
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                ></path>
              </svg>
            }
            value={statistics.userAccidentsCount}
            label="Accidents"
          />
          <StatisticsCard
            bgColor="blue-500"
            borderColor="blue-600"
            icon={
              <svg
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            }
            value={statistics.userClaimsCount}
            label="Claims"
          />
        </div>
        <WebsiteInfo /> {/* Include the WebsiteInfo component */}
      </div>
      {/* <!-- Statistics Cards --> */}
      <div className=" ml-14 mb-10 md:ml-64  overflow-hidden">
        {Object.keys(latestVehicles).length > 0 ? (
          <div className="flex m items-center justify-center">
            <div className="relative flex flex-col w-full max-w-[48rem] sm:flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
              <div className="relative m-0 w-full mx-5 sm:m-0 sm:w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
                <img
                  src={`${process.env.REACT_APP_API_LINK}${latestVehicles.picture_url}`}
                  alt={`Picture of ${latestVehicles.make} ${latestVehicles.model}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-blue-700 antialiased">
                  Your Latest Vehicle
                </h6>
                <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  Model : {latestVehicles.model || "Vehicle Model"} |{" "}
                  {latestVehicles.make}
                </h4>

                <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                  {latestVehicles.description || "Description of the vehicle."}
                </p>

                <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                  Year : {latestVehicles.year || "Description of the vehicle."}
                </p>
                <a
                  className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  href="/user/vehicles"
                >
                  Learn More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
