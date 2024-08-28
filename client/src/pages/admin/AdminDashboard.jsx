import React, { useEffect, useState } from "react";
import MenuDark from "../../components/layout/MenuDark";
import SidebarDark from "../../components/layout/SidebarDark";
import StatisticsCardDark from "../../components/layout/StatisticsCardDark";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_LINK}/statistics/`
        );
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Prepare data for the charts
  const claimsPerDayData = statistics.claimsPerDay.map((item) => ({
    date: new Date(item.date_submitted).toLocaleDateString(),
    claims: item._count.id,
  }));

  const policiesPerDayData = statistics.policiesPerDay.map((item) => ({
    date: new Date(item.start_date).toLocaleDateString(),
    policies: item._count.id,
  }));

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-700 text-black">
      <MenuDark />
      <SidebarDark />
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
          <StatisticsCardDark
            bgColor="blue-500"
            borderColor="blue-600"
            icon={<svg>...</svg>} // Your existing icon
            value={statistics.userCount}
            label="Users"
          />
          <StatisticsCardDark
            bgColor="blue-500"
            borderColor="blue-600"
            icon={<svg>...</svg>} // Your existing icon
            value={statistics.claimCount}
            label="Claims"
          />
          <StatisticsCardDark
            bgColor="blue-500"
            borderColor="blue-600"
            icon={<svg>...</svg>} // Your existing icon
            value={statistics.vehicleCount}
            label="Vehicles"
          />
          <StatisticsCardDark
            bgColor="blue-500"
            borderColor="blue-600"
            icon={<svg>...</svg>} // Your existing icon
            value={statistics.accidentCount}
            label="Accidents"
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold">Claims per Day</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={claimsPerDayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="claims" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold">Policies per Day</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={policiesPerDayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="policies" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
