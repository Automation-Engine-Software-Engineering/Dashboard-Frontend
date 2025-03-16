import { cn, getInitialName } from "@/lib/utils";

import { useSession } from "@/hooks/server-state/use-session";

import { API_URL } from "@/components/layout/header/avatar/index";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PopoverContent } from "@/components/ui/popover";

type ContentBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
};

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
  return (
    <div
      className={cn(
        "flex h-[230px] w-full flex-col justify-start rounded-sm",
        className
      )}
      {...props}
    >
      <ContentProfile />
      <ContentBtn text="ویرایش پروفایل" />
      <hr />
      <ContentBtn text="تغییر رمز عبور" />
      <hr />
      <ContentBtn text="خروج" />
    </div>
  );
};

const ContentBtn: React.FC<ContentBtnProps> = ({
  className,
  text,
  ...props
}) => {
  return (
    <button
      // className={`flex h-12 items-center rounded-sm pr-2 hover:bg-[#E4EBF3] ${className} `}
      className={cn(
        "flex h-12 items-center rounded-sm pr-2 hover:bg-[#E4EBF3]",
        className
      )}
      {...props}
    >
      {text}
    </button>
  );
};

const ContentProfile: React.FC = () => {
  const { data: session } = useSession();
  const sessionTitle = session?.department.titleFa;
  const sessionFullname = `${session?.firstNameFa} ${session?.lastNameFa}`;
  const fallbackName = getInitialName(sessionFullname);

  return (
    <div className="mb-5 flex flex-col">
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
      <button className="rounded-lg border-2 border-[#0099A5] hover:bg-[hsl(184,100%,34%)] hover:text-white">
        مشاهده پروفایل
      </button>
    </div>
  );
};
