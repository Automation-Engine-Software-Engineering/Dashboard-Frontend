import { Outlet } from "react-router-dom";

import Breadcrumb from "../common/breadcrumbs";
import Header from "./header";

const Layout = () => {
  return (
    <>
      <Header />
      <Breadcrumb />
      <div className="relative flex h-full">
        {/* <Navbar className="shrink-0" /> */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default Layout;
