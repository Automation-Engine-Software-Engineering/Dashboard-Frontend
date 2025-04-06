import SearchInput from "./search-input";

const Header = () => {
  return (
    <div className="h-20 w-full px-10 flex items-center bg-white sticky top-0 shadow-xl shadow-black/5">
      <SearchInput />
    </div>
  );
};
export default Header;
