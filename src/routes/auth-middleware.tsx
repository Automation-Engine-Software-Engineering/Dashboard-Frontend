import { Navigate, Outlet } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useProfile } from "@/hooks/server-state/use-profile";
import { useSession } from "@/hooks/server-state/use-session";

const AuthMiddleware = () => {
  const { data, isLoading } = useSession();
  useProfile();

  if (isLoading) return <Loading />;

  if (data?.needNewPassword) return <Navigate to="/change-password" />;

  return data ? <Outlet /> : <Navigate to="/login" />;
};

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <MoonLoader color="#0099A5" size={50} />
    </div>
  );
};

export default AuthMiddleware;
