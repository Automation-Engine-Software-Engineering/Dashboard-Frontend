import { getSession } from "@/auth";

import { cn, getInitialName } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";

import MenuPopover from "./menu-popover";

const AvatarMenu: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const { name } = getSession();

  const fallbackName = getInitialName(name);

  return (
    <div className={cn(className)} {...props}>
      <Popover>
        <PopoverTrigger>
          <Avatar>
            <AvatarFallback>{fallbackName}</AvatarFallback>
            <AvatarImage />
          </Avatar>
        </PopoverTrigger>
        <MenuPopover />
      </Popover>
    </div>
  );
};
export default AvatarMenu;
