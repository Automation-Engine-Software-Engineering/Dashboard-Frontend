import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/context/auth";

const AuthMiddleware = () => {
  const { auth } = useAuth();

  return !auth?.user ? <Outlet /> : <Navigate to="/login" />;
};
export default AuthMiddleware;
