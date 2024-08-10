import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth({ role }) {
  // Hardcoded user and role for testing
  const currentUser = { name: "Test User" }; // Change this to null to simulate no user
  const userRole = "admin"; // Change this to "user" to simulate a different role
  const location = useLocation();
  // console.log("Current User:", currentUser);
  // console.log("User Role:", userRole);
  // console.log("Required Role:", role);

  if (currentUser && userRole === role) {
    return <Outlet />;
  } else {
    return <Navigate state={{ form: location }} replace to="/login" />;
  }
}

export default RequireAuth;
