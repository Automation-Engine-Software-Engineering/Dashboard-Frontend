import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Header from "./header";

const Layout = () => {
  return (
    <div className="flex h-full">
      <Navbar className="shrink-0" />
      <div className="flex-1">
        <Header />
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Layout;
