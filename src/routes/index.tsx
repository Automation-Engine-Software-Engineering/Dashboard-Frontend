import { Navigate, Route, Routes } from "react-router-dom";
import AuthMiddleware from "./auth-middleware";
import LoginPage from "@/pages/login";
import DashboardPage from "@/pages/dashboard";
import Layout from "@/components/layout/layout";
import TablePage from "@/pages/table";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Private routes */}

      {/* <Route element={<AuthMiddleware />}> */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/table" element={<TablePage />} />
      </Route>
      {/* </Route> */}
    </Routes>
  );
};

export default Router;
