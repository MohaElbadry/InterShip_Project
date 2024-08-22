import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/layout/LoadingSpinner";

function RequireAuth({ role }) {
  const { auth } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      // Simulate a delay of 2 seconds before hiding the loader
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [auth]);

  if (loading) {
    return <LoadingSpinner />; // Show spinner while loading
  }

  if (!auth || (role && auth.user.role !== role)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
