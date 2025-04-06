import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="flex h-10 w-64 items-center gap-x-2 rounded-full bg-[#F3F3F9] pe-3 ps-5">
      <Search size={18} className="text-slate-400" />
      <input
        type="text"
        placeholder="جستجو..."
        className="h-full w-full bg-transparent text-sm focus-within:outline-none"
      />
    </div>
  );
};
export default SearchInput;
