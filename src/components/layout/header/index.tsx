import { LogOut } from "lucide-react";

import { logout } from "@/auth";

import AvatarMenu from "@/components/common/avatar-menu";

import { Button } from "@/components/ui/button";

import SearchInput from "./search-input";

const Header = () => {
  return (
    <div className="sticky top-0 flex h-20 w-full items-center bg-white px-10 shadow-xl shadow-black/5">
      <SearchInput />
      <AvatarMenu className="ms-auto" />
      <Button
        variant="destructive"
        onClick={logout}
        className="ms-5 flex size-8 items-center justify-center rounded-full bg-transparent p-0 text-red-600 hover:text-white"
      >
        <LogOut />
      </Button>
    </div>
  );
};
export default Header;
