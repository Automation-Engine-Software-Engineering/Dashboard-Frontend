import { getSession } from "@/auth";

import { cn, getInitialName } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";

import AvatarMenuContent from "./avatar-menu-content";

const AvatarMenu: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const session = getSession();

  const fallbackName = getInitialName(session?.name);

  return (
    <div className={cn(className)} {...props}>
      <Popover>
        <PopoverTrigger className="group flex items-center gap-x-5">
          <p className="flex items-center gap-x-1 text-sm text-white group-hover:underline">
            {session?.name}
          </p>
          <Avatar>
            <AvatarFallback className="text-sm">{fallbackName}</AvatarFallback>
            <AvatarImage />
          </Avatar>
        </PopoverTrigger>
        <AvatarMenuContent />
      </Popover>
    </div>
  );
};
export default AvatarMenu;
