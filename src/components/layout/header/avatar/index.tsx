import { cn, getInitialName } from "@/lib/utils";

import { useSession } from "@/hooks/useSession";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";

const API_URL = import.meta.env.VITE_API_URL as string;

const AvatarMenu: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const { data: session } = useSession();

  const sessionFullname = `${session.firstNameFa} ${session.lastNameFa}`;
  const fallbackName = getInitialName(sessionFullname);

  return (
    <div className={cn(className)} {...props}>
      <Popover>
        <PopoverTrigger className="group flex items-center gap-x-5">
          <p className="flex items-center gap-x-1 text-sm text-white group-hover:underline">
            {sessionFullname}
          </p>
          <Avatar>
            <AvatarFallback className="text-sm">{fallbackName}</AvatarFallback>
            <AvatarImage src={`${API_URL}/${session.imageUrl}`} />
          </Avatar>
        </PopoverTrigger>
      </Popover>
    </div>
  );
};
export default AvatarMenu;
