import { Navigate, Route, Routes } from "react-router-dom";

import DashboardPage from "@/pages/dashboard";
import FormPage from "@/pages/form";
import LoginPage from "@/pages/login";
import A1 from "@/pages/page/A1";
import A2 from "@/pages/page/A2";
import A3 from "@/pages/page/A3";
import Iframe from "@/pages/page/iframe";
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
          <Route
            path="/dashboard/workflow/table/:tableId"
            element={<TablePage />}
          />
          <Route path="/dashboard/table" element={<TablePage />} />
          <Route path="/dashboard/page/a1" element={<A1 />} />
          <Route path="/dashboard/page/a2" element={<A2 />} />
          <Route path="/dashboard/page/a3" element={<A3 />} />
          <Route path="/dashboard/page/frame" element={<Iframe />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
