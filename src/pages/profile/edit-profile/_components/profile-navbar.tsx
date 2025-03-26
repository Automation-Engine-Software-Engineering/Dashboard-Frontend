import { Edit } from "lucide-react";
import { useState } from "react";

import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

import LastUpdate from "./last-update";
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    <div className="mb-2 flex h-10 w-full items-center bg-[#E4EBF3] pe-4">
      <ul className="flex h-full bg-white">
        {profileEditNavItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.href}
              className={({ isActive }) => {
                if (isActive) setActiveIndex(index);

                return cn(
                  "navlink flex h-full items-center border-t border-t-transparent bg-[#e4ebf3] px-4",
                  isActive &&
                    "active border-t-2 border-t-primary bg-transparent",
                  activeIndex === index - 1 && "rounded-br-xl",
                  activeIndex === index + 1 && "rounded-bl-xl"
                );
              }}
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
          <Edit size={12} className="text-[#30aab5]" />
          <p className="">ویرایش</p>
        </div>
      </div>
    </div>
  );
};
export default ProfileNavbar;
