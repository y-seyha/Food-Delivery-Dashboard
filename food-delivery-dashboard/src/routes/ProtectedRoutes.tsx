import type { ReactNode } from "react";
import { AuthStorageKeys } from "../types/auth";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem(AuthStorageKeys.TOKEN);

  if (!token) return <Navigate to="/login" replace />;
  return <div>{children}</div>;
};

export default ProtectedRoutes;
