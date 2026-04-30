import { type FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsAuthenticated } from "@/store/slices/authSlice";

const GuestRoute: FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/partner/dashboard" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
