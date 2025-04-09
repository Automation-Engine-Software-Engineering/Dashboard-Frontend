import { ChevronDown } from "lucide-react";

import { cn, getInitialName } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";

import MenuPopover from "./menu-popover";

const AvatarMenu: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  // const { name } = getSession();

  const fallbackName = getInitialName("Admin");

  return (
    <div className={cn(className)} {...props}>
      <Popover>
        <PopoverTrigger className="group flex items-center gap-x-1">
          <Avatar>
            <AvatarFallback>{fallbackName}</AvatarFallback>
            <AvatarImage />
          </Avatar>
          <p className="flex items-center gap-x-1 group-hover:underline">
            ادمین
            <ChevronDown size={16} />
          </p>
        </PopoverTrigger>
        <MenuPopover />
      </Popover>
    </div>
  );
};
export default AvatarMenu;
