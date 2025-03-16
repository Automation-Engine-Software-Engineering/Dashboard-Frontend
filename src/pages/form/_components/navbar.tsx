import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

const FormNavbar = () => {
  const profileEditNavItems = [
    {
      label: "فرم ها",
      href: ""
    },
    {
      label: "جداول",
      href: "entities"
    }
  ];

  return (
    <div className="flex h-10 w-full items-center bg-[#E4EBF3] pe-4">
      <ul className="flex h-full">
        {profileEditNavItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex h-full items-center border-t border-t-transparent px-4",
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
    </div>
  );
};
export default FormNavbar;
