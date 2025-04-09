import { LogOut } from "lucide-react";

import { logout } from "@/auth";

const Logout = () => {
  return (
    <button onClick={logout}>
      <LogOut size={25} className="text-red-500" />
    </button>
  );
};
export default Logout;
