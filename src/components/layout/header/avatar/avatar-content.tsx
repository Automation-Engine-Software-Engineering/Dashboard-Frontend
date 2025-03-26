import { logout } from "@/auth";
import { Link } from "react-router-dom";

import { cn, getInitialName } from "@/lib/utils";

import { useProfile } from "@/hooks/server-state/use-profile";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PopoverContent } from "@/components/ui/popover";

const API_URL = import.meta.env.API_URL as string;

const AvatarContent = () => {
  return (
    <PopoverContent className="w-[250px]">
      <Contents />
    </PopoverContent>
  );
};
export default AvatarContent;

const Contents: React.FC<React.ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  const { data: session } = useProfile();
  const sessionTitle = session?.department.titleFa;
  const sessionFullname = `${session?.firstNameFa} ${session?.lastNameFa}`;
  const fallbackName = getInitialName(sessionFullname);

  return (
    <div
      className={cn("flex w-full flex-col justify-start rounded-sm", className)}
      {...props}
    >
      <div className="flex flex-col">
        <div className="mb-4 flex">
          <Avatar className="ml-2 size-12 border border-[#E4EBF3]">
            <AvatarFallback className="text-sm">{fallbackName}</AvatarFallback>
            <AvatarImage src={`${API_URL}/${session?.imageUrl}`} />
          </Avatar>
          <div>
            <h5 className="mb-2 font-medium"> {sessionFullname}</h5>
            <p className="text-xs">{` دانشیار رشته ${sessionTitle}`}</p>
            <p className="text-xs">دانشگاه اصفهان</p>
          </div>
        </div>
      </div>
      <Button variant="ghost" asChild>
        <Link to="/change-password">تغییر رمز عبور </Link>
      </Button>
      <Button variant="ghost" onClick={logout}>
        خروج
      </Button>
    </div>
  );
};
