import { Route, Routes } from "react-router-dom";

// import FormPage from "@/pages/_";
import DashboardPage from "@/pages/dashboard";
import FormPage from "@/pages/form";
import FormEditorPage from "@/pages/form/editor";
import EntitiesPage from "@/pages/form/entities";
import FormsPage from "@/pages/form/forms";
import PropertiesPage from "@/pages/form/properties";
import LoginPage from "@/pages/login";
import NotFoundPage from "@/pages/not-found";
import A1 from "@/pages/page/A1";
import A2 from "@/pages/page/A2";
import A3 from "@/pages/page/A3";
import Iframe from "@/pages/page/iframe";
import EditProfilePage from "@/pages/profile/edit-profile";
import EditProfileAboutMe from "@/pages/profile/edit-profile/about-me";
import EditProfileEducation from "@/pages/profile/edit-profile/education";
import EditProfileResearch from "@/pages/profile/edit-profile/research";
import EditProfileSocialLinks from "@/pages/profile/edit-profile/social-links";

// import TablePage from "@/pages/table";
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
          {/* <Route path="/workflow/form/:formId" element={<FormPage />} /> */}
          {/* <Route path="/workflow/table/:tableId" element={<TablePage />} /> */}
          {/* <Route path="/table" element={<TablePage />} /> */}
          <Route path="/page/a1" element={<A1 />} />
          <Route path="/page/a2" element={<A2 />} />
          <Route path="/page/a3" element={<A3 />} />
          <Route path="/page/frame" element={<Iframe />} />

          {/* Edit Profile */}
          <Route path="/edit-profile" element={<EditProfilePage />}>
            <Route path="" element={<EditProfileAboutMe />} />
            <Route path="research" element={<EditProfileResearch />} />
            <Route path="education" element={<EditProfileEducation />} />
            <Route path="social-links" element={<EditProfileSocialLinks />} />
          </Route>

          {/* Form Creator  */}
          <Route path="/form" element={<FormPage />}>
            <Route path="" element={<FormsPage />} />
            <Route path="entities" element={<EntitiesPage />} />
            <Route path="entities/:entityId" element={<PropertiesPage />} />
            <Route path=":formId" element={<FormEditorPage />} />
          </Route>

          {/* Not Found Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
