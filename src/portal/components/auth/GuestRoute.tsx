import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsAuthenticated } from "@/store/slices/authSlice";

export default function GuestRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/partner/dashboard" replace />;
  }

  return <Outlet />;
}
