import { Outlet } from "react-router-dom";

import Breadcrumb from "../common/breadcrumbs";
import { Footer } from "./Footer/index";
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
        <main className="h-[calc(100vh-118px)] flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};
export default Layout;
