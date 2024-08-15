import React from "react";
import Header from "../../components/layout/Header";
import { useAuth } from "../../context/AuthContext";
import Logout from "../auth/Logout";

export default function AdminUsers() {
  const { auth } = useAuth(); // Get the auth data from context

  return (
    <>
      <Header />
      <h1>Admin USERS</h1>;
      <Logout />
    </>
  );
}
