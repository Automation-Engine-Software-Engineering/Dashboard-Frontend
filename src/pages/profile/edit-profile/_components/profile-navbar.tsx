import { Edit } from "lucide-react";

import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

import LastUpdate from "./LastUpdate";
import { ShareModal } from "./share-modal";

const ProfileNavbar = () => {
  const profileEditNavItems = [
    {
      label: "درباره من",
      href: ""
    },
    {
      label: "اطلاعات پژوهشی",
      href: "research"
    },
    {
      label: "اطلاعات تحصیلی و آموزشی",
      href: "education"
    },
    {
      label: "وبسایت‌ و شبکه‌های اجتماعی",
      href: "social-links"
    }
  ];

  return (
    <div className="mb-2 flex h-10 w-full items-center bg-[#E4EBF3] pe-4">
      <ul className="flex h-full">
        {profileEditNavItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex h-full items-center border-l border-t border-l-slate-300 border-t-transparent px-4",
                  isActive && "border-t-2 border-t-primary bg-white"
                )
              }
              end
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="ms-auto flex items-center gap-x-5 text-xs">
        <LastUpdate />
        <ShareModal />
        <div className="flex items-center gap-x-1">
          <Edit size={12} />
          <p className="">ویرایش</p>
        </div>
      </div>
    </div>
  );
};
export default ProfileNavbar;
