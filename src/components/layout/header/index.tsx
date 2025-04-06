import SearchInput from "./search-input";

const Header = () => {
  return (
    <div className="sticky top-0 flex h-20 w-full items-center bg-white px-10 shadow-xl shadow-black/5">
      <SearchInput />
    </div>
  );
};
export default Header;
