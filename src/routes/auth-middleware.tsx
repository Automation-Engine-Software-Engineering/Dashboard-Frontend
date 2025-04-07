import { getSession } from "@/auth";
import { Navigate, Outlet } from "react-router-dom";

const AuthMiddleware = () => {
  const session = getSession();

  return session ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthMiddleware;
