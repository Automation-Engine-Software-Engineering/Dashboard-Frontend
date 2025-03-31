import { useState } from "react";

import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

const BookNav = () => {
  const profileEditNavItems = [
    {
      label: "خودکار",
      href: ""
    },
    {
      label: "URL",
      href: "url"
    },
    {
      label: "Google Scholar",
      href: "scholar"
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
    </div>
  );
};
export default BookNav;
