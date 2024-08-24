import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
// Auth pages
import Home from "./pages/Home";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminVehicles from "./pages/admin/Vehicles";
import AdminAccidents from "./pages/admin/Accidents";
// User Pages
import UserDashboard from "./pages/users/UserDashboard";
import Vehicles from "./pages/users/Vehicles";
import Claim from "./pages/users/Claim";
import RequireAuth from "./pages/auth/RequireAuth";
import NotFound from "./pages/NotFound";
import Accident from "./pages/users/Accident";
import Insurance from "./pages/users/Insurance";
import UserProfile from "./pages/users/UserProfile";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {" "}
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Private Routes */}
          <Route element={<RequireAuth role="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/vehicles" element={<AdminVehicles />} />
            <Route path="/admin/accidents" element={<AdminAccidents />} />
          </Route>

          <Route element={<RequireAuth role="user" />}>
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/user/vehicles" element={<Vehicles />} />
            <Route path="/user/claim" element={<Claim />} />
            <Route path="/user/accident" element={<Accident />} />
            <Route path="/user/insurance" element={<Insurance />} />
            <Route path="/user/profile" element={<UserProfile />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>{" "}
    </AuthProvider>
  );
};

export default App;
