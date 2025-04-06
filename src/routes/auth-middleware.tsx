import { getSession } from "@/auth";
import { Navigate, Outlet } from "react-router-dom";

const AuthMiddleware = () => {
  const session = getSession();

  console.log(session);

  return session ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthMiddleware;
