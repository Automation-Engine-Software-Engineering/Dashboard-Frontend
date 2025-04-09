import { Route, Routes } from "react-router-dom";

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
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Private routes */}
      <Route element={<AuthMiddleware />}>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/workflow/form/:formId" element={<FormPage />} />
          <Route path="/workflow/table/:tableId" element={<TablePage />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/page/a1" element={<A1 />} />
          <Route path="/page/a2" element={<A2 />} />
          <Route path="/page/a3" element={<A3 />} />
          <Route path="/page/frame" element={<Iframe />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
