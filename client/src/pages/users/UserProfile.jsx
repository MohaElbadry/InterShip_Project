import React, { useEffect, useState } from "react";
import Menu from "../../components/common/user/Menu";
import Sidebar from "../../components/common/user/Sidebar";
import Profile from "../../components/common/user/profile/Profile.jsx";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
export default function UserProfile() {
  const { auth } = useAuth(); // Get the auth data from context
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Fetch all UserInfo for the user in reverse order
        const response = await axios.get(
          `${process.env.REACT_APP_API_LINK}/user/${auth.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setUserInfo(response.data);
        console.log(auth.token);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserInfo();
  }, []);
  if (loading) return <p>Loading...</p>; // Display loading message while fetching

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black">
      {/* Header */}
      <Menu />
      {/* ./Header */}
      <Sidebar />
      <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
        <Profile userInfo={userInfo} />
      </div>
    </div>
  );
}
