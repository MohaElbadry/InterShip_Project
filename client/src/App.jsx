import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import UserDashboard from "./pages/users/UserDashboard";
import Vehicles from "./pages/users/Vehicles";
import Claim from "./pages/users/Claim";
import RequireAuth from "./pages/auth/RequireAuth";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import Accident from "./pages/users/Accident";
import Insurance from "./pages/users/Insurance";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Private Routes */}
          <Route element={<RequireAuth role="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>

          <Route element={<RequireAuth role="user" />}>
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/user/vehicles" element={<Vehicles />} />
            <Route path="/user/claim" element={<Claim />} />
            <Route path="/user/accident" element={<Accident />} />
            <Route path="/user/insurance" element={<Insurance />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>{" "}
    </AuthProvider>
  );
};

export default App;
