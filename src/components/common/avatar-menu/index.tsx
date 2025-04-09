import { ChevronDown } from "lucide-react";

import { getSession } from "@/auth";

import { cn, getInitialName } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";

import MenuPopover from "./menu-popover";

const AvatarMenu: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const session = getSession();
  console.log(session);

  const fallbackName = getInitialName(session?.name);

  return (
    <div className={cn(className)} {...props}>
      <Popover>
        <PopoverTrigger className="group flex items-center gap-x-1">
          <Avatar>
            <AvatarFallback>{fallbackName}</AvatarFallback>
            <AvatarImage />
          </Avatar>
          <p className="flex items-center gap-x-1 group-hover:underline">
            {session?.name}
            <ChevronDown size={16} />
          </p>
        </PopoverTrigger>
        <MenuPopover />
      </Popover>
    </div>
  );
};
export default AvatarMenu;
