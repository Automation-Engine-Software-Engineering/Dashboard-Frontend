import { Route, Routes } from "react-router-dom";

import ArticlePage from "@/pages/article";
import ArticleAutoPage from "@/pages/article/auto";
import ArticleScholarPage from "@/pages/article/scholar";
import ArticleUrlPage from "@/pages/article/url";
import ChangePasswordPage from "@/pages/change-password";
import DashboardPage from "@/pages/dashboard";
import ErrorPage from "@/pages/error";
import FormPage from "@/pages/form";
import FormEditorPage from "@/pages/form/editor";
import EntitiesPage from "@/pages/form/entities";
import FormFinal from "@/pages/form/final";
import FormsPage from "@/pages/form/forms";
import FormPreviewPage from "@/pages/form/preview";
import PropertiesPage from "@/pages/form/properties";
import LoginPage from "@/pages/login";
import MenuItemsPage from "@/pages/menu/menu-items";
import NotFoundPage from "@/pages/not-found";
import EditProfilePage from "@/pages/profile/edit-profile";
import EditProfileAboutMe from "@/pages/profile/edit-profile/about-me";
import EditProfileEducation from "@/pages/profile/edit-profile/education";
import EditProfileResearch from "@/pages/profile/edit-profile/research";
import EditProfileSocialLinks from "@/pages/profile/edit-profile/social-links";
import RolesPage from "@/pages/role";
import WorkflowsPage from "@/pages/workflow";
import WorkflowPage from "@/pages/workflow/flow";

import Layout from "@/components/layout/layout";

import NewBook from "../pages/book";
import LC from "../pages/book/LC";
import AuthMiddleware from "./auth-middleware";

const Router = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Change password */}
      <Route path="/change-password" element={<ChangePasswordPage />} />

      {/* Private routes */}
      <Route element={<AuthMiddleware />}>
        <Route element={<Layout />}>
          <Route index element={<DashboardPage />} />

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
            <Route path="editor/:formId" element={<FormEditorPage />} />
            <Route path="preview/:formId" element={<FormPreviewPage />} />
          </Route>
          <Route path="/form/:workflowUserId" element={<FormFinal />} />

          {/* Workflow */}
          <Route path="/workflow">
            <Route index element={<WorkflowsPage />} />
            <Route path=":workflowId" element={<WorkflowPage />} />
          </Route>

          {/* Roles */}
          <Route path="/role">
            <Route index element={<RolesPage />} />
          </Route>

          <Route path="/menu">
            <Route index element={<MenuItemsPage />} />
          </Route>

          {/* Book  */}
          <Route path="/new-book" element={<NewBook />}>
            <Route index element={<NewBook />} />
            <Route path="lc" element={<LC />} />
          </Route>

          {/* Article  */}
          <Route path="/new-article" element={<ArticlePage />}>
            <Route index element={<ArticleAutoPage />} />
            <Route path="scholar" element={<ArticleScholarPage />} />
            <Route path="url" element={<ArticleUrlPage />} />
          </Route>

          {/* Not Found Page */}
          <Route path="*" element={<NotFoundPage />} />

          {/* Error Page */}

          <Route path="/error" element={<ErrorPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
