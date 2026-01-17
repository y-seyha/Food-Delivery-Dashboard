import { type ReactNode } from "react";

interface ProtectedRoutesProps {
  children: ReactNode;
}
const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  return <>{children}</>;
};

export default ProtectedRoutes;
