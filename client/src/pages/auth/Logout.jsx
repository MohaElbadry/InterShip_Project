import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Add this import

export default function Logout({ style }) {
  const navigate = useNavigate();
  const { setAuth } = useAuth(); // Add this line

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuth(null); // Remove auth data from context
    console.log("Logging out");
    navigate("/login");
  };

  return (
    <button className={style} onClick={handleLogout}>
      <span className="inline-flex mr-1">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          ></path>
        </svg>
      </span>
      Logout
    </button>
  );
}
