import { Navigate, Route, Routes } from "react-router-dom";

import DashboardPage from "@/pages/dashboard";
import FormPage from "@/pages/form";
import LoginPage from "@/pages/login";
import TablePage from "@/pages/table";

import Layout from "@/components/layout/layout";

import AuthMiddleware from "./auth-middleware";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Private routes */}

      <Route element={<AuthMiddleware />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/dashboard/workflow/form/:formId"
            element={<FormPage />}
          />
          <Route path="/dashboard/table" element={<TablePage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
