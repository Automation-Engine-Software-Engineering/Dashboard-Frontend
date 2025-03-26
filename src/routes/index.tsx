import { Route, Routes } from "react-router-dom";

import ChangePasswordPage from "@/pages/change-password";
// import FormPage from "@/pages/_";
import DashboardPage from "@/pages/dashboard";
import FormPage from "@/pages/form";
import FormEditorPage from "@/pages/form/editor";
import EntitiesPage from "@/pages/form/entities";
import FormsPage from "@/pages/form/forms";
import FormPreviewPage from "@/pages/form/preview";
import PropertiesPage from "@/pages/form/properties";
import LoginPage from "@/pages/login";
import NotFoundPage from "@/pages/not-found";
import EditProfilePage from "@/pages/profile/edit-profile";
import EditProfileAboutMe from "@/pages/profile/edit-profile/about-me";
import EditProfileEducation from "@/pages/profile/edit-profile/education";
import EditProfileResearch from "@/pages/profile/edit-profile/research";
import EditProfileSocialLinks from "@/pages/profile/edit-profile/social-links";
import WorkflowsPage from "@/pages/workflow";
import WorkflowPage from "@/pages/workflow/flow";

import Layout from "@/components/layout/layout";

import NewBook from "../pages/Book";
import LC from "../pages/Book/LC";
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

          {/* Edit Profile */}
          <Route path="/edit-profile" element={<EditProfilePage />}>
            <Route index element={<EditProfileAboutMe />} />
            <Route path="research" element={<EditProfileResearch />} />
            <Route path="education" element={<EditProfileEducation />} />
            <Route path="social-links" element={<EditProfileSocialLinks />} />
          </Route>

          {/* Form Creator  */}
          <Route path="/form" element={<FormPage />}>
            <Route index element={<FormsPage />} />
            <Route path="entities" element={<EntitiesPage />} />
            <Route path="entities/:entityId" element={<PropertiesPage />} />
            <Route path=":formId" element={<FormEditorPage />} />
            <Route path="preview/:formId" element={<FormPreviewPage />} />
          </Route>

          {/* Workflow */}
          <Route path="/workflow">
            <Route index element={<WorkflowsPage />} />
            <Route path=":workflowId" element={<WorkflowPage />} />
          </Route>

          {/* Book  */}
          <Route path="/new-book" element={<NewBook />}>
            <Route index element={<NewBook />} />
            <Route path="lc" element={<LC />} />
          </Route>

          {/* Change password */}
          <Route path="/change-password" element={<ChangePasswordPage />} />

          {/* Not Found Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
