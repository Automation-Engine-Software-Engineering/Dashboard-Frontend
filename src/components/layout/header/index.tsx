import AvatarMenu from "@/components/common/avatar-menu";

import SearchInput from "./search-input";

const Header = () => {
  return (
    <div className="sticky top-0 flex h-20 w-full items-center bg-white px-10 shadow-xl shadow-black/5">
      <SearchInput />
      <AvatarMenu className="ms-auto" />
    </div>
  );
};
export default Header;
