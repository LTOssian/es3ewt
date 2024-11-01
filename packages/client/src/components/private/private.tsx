import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  return !!document.cookie.includes("token");
};

// PrivateRoute component to protect routes
export function PrivateRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/auth/login" />;
}
