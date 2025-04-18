import { cn, getInitialName } from "@/lib/utils";

import { useSession } from "@/hooks/server-state/use-session";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";

import AvatarContent from "./avatar-content";

// export const API_URL = import.meta.env.VITE_API_URL as string;

const AvatarMenu: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const { data: session } = useSession();

  return (
    <div className={cn(className)} {...props}>
      <Popover>
        <PopoverTrigger className="group flex items-center gap-x-5">
          <p className="flex items-center gap-x-1 text-sm text-white group-hover:underline">
            {session?.name || "بدون نام"}
          </p>
          <Avatar>
            <AvatarFallback className="text-sm">
              {getInitialName(session?.name ?? "بدون نام")}
            </AvatarFallback>
            {/* <AvatarImage src={`${API_URL}/${session?.imageUrl}`} /> */}
          </Avatar>
        </PopoverTrigger>
        <AvatarContent />
      </Popover>
    </div>
  );
};
export default AvatarMenu;
