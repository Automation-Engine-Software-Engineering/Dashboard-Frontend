import { Settings, Trash, UserRound } from "lucide-react";

import { logout } from "@/auth";

import { PopoverContent } from "@/components/ui/popover";

const MenuPopover = () => {
  return (
    <PopoverContent className="max-w-[300px] px-0 py-2">
      <div className="flex items-center gap-x-2 px-5 py-2 transition-colors hover:bg-slate-100">
        <UserRound size={16} />
        <p className="text-sm">پروفایل</p>
      </div>
      <div className="flex items-center gap-x-2 px-5 py-2 transition-colors hover:bg-slate-100">
        <Settings size={16} />
        <p className="text-sm">تنظیمات</p>
      </div>
      <div
        className="flex items-center gap-x-2 px-5 py-2 text-red-500 transition-colors hover:bg-slate-100"
        onClick={logout}
      >
        <Trash size={16} />
        <p className="text-sm">خروج</p>
      </div>
    </PopoverContent>
  );
};
export default MenuPopover;
