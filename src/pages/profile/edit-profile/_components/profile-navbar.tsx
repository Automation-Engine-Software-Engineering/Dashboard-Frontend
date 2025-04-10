import { CalendarClock, Edit, Share2 } from "lucide-react";

import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

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
        {profileEditNavItems.map((item) => (
          <li>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex h-full items-center border-t border-t-transparent px-4",
                  isActive && "border-t-[#0099A5] bg-white"
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
        <div className="flex items-center gap-x-1">
          <CalendarClock size={12} />
          <p className="">آخرین بروزرسانی: 1403/09/07</p>
        </div>
        <div className="flex items-center gap-x-1">
          <Share2 size={12} />
          <p className="">اشتراک گذاری</p>
        </div>
        <div className="flex items-center gap-x-1">
          <Edit size={12} />
          <p className="">ویرایش</p>
        </div>
      </div>
    </div>
  );
};
export default ProfileNavbar;
