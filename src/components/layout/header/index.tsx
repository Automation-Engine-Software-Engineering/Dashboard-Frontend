import AvatarMenu from "@/components/layout/header/avatar";

import Logout from "./logout";
import Messages from "./messages";
import Notifications from "./notifications";
import Settings from "./settings";

const Header = () => {
  return (
    <div className="bg-secondary flex h-[70px] w-full items-center px-6">
      <div className="">
        <img src="/images/logo.png" alt="" width={165} />
      </div>
      <AvatarMenu className="ms-auto" />
      <div className="ms-5 flex items-center gap-x-5">
        <Notifications />
        <Messages />
        <Settings />
        <Logout />
      </div>
    </div>
  );
};
export default Header;
