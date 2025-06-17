import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth({ allowedRoles }) {
  const { role, isLoggedIn } = useSelector((state) => state.auth);
console.log("Role:", role, "isLoggedIn:", isLoggedIn);

  const location = useLocation();

  const userRole = user?.role;

  return isLoggedIn && allowedRoles.includes(userRole) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to="/denied" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
