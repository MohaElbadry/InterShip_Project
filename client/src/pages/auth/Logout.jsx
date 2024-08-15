import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Add this import

const Logout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth(); // Add this line

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuth(null); // Remove auth data from context
    console.log("Logging out");
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
