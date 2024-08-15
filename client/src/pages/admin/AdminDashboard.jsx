import * as React from "react";
import Logout from "../auth/Logout";
import Header from "../../components/layout/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { auth } = useAuth(); // Get the auth data from context

  const handleLogout = () => {
    navigate("/admin/users");
  };
  return (
    <>
      <Header />
      {auth ? <h1>auth</h1> : <h1>ERR</h1>}
      <button onClick={handleLogout}>PASSS</button>
      <h1>DASH admin</h1>
      <Logout />
    </>
  );
}
