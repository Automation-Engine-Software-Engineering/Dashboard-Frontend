import { Outlet } from "react-router-dom";

import Breadcrumb from "../common/breadcrumbs";
import Header from "./header";
import Navbar from "./navbar";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="border-b border-slate-300">
        <Breadcrumb />
      </div>
      <div className="relative flex h-full">
        <Navbar className="shrink-0" />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Layout;
