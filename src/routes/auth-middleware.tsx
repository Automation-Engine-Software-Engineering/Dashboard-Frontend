import { useAuth } from "@/context/auth";
import { Navigate, Outlet } from "react-router-dom";

const AuthMiddleware = () => {
  const { auth } = useAuth();

  return !auth?.user ? <Outlet /> : <Navigate to="/login" />;
};
export default AuthMiddleware;
