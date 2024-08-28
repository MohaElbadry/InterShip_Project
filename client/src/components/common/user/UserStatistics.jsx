import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const UserStatistics = ({ userId }) => {
  const { auth } = useAuth();
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStatistics = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_LINK}/statistics/user/${userId}`,
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

    fetchUserStatistics();
  }, [userId, auth.token]);

  if (loading) return <p>Loading user statistics...</p>;

  return (
    <div className="user-statistics">
      <h2>User Statistics</h2>
      <p>Claims Count: {statistics.userClaimsCount}</p>
      <p>Vehicles Count: {statistics.userVehiclesCount}</p>
      <p>Accidents Count: {statistics.userAccidentsCount}</p>
    </div>
  );
};

export default UserStatistics;
