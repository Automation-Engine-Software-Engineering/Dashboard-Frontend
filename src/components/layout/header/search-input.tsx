import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="h-10 w-64 flex ps-5 pe-3 gap-x-2 rounded-full items-center bg-[#F3F3F9]">
      <Search size={18} className="text-slate-400" />
      <input
        type="text"
        placeholder="جستجو..."
        className="bg-transparent text-sm w-full h-full focus-within:outline-none"
      />
    </div>
  );
};
export default SearchInput;
