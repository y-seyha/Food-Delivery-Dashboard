import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoutes from "./ProtectedRoutes";

import DashboardHome from "../pages/dashboard/DashboardHome";
import Orders from "../pages/dashboard/Orders";
import Foods from "../pages/dashboard/Foods";
import Users from "../pages/dashboard/Users";
import Profile from "../pages/dashboard/Profile";
import Login from "../pages/dashboard/Login";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoutes>
            <DashboardLayout />
          </ProtectedRoutes>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="orders" element={<Orders />} />
        <Route path="foods" element={<Foods />} />
        <Route path="users" element={<Users />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default DashboardRoutes;
