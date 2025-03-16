// import { IconNode } from "lucide-react";
import { FC } from "react";

import { cn } from "@/lib/utils";

interface ShareItemsProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
  icon: any;
  link: string;
  bgcolor?: string;
}

export const ShareItems: FC<ShareItemsProps> = ({
  name,
  icon,
  link,
  bgcolor,
  ...props
}) => {
  return (
    <a
      href={link}
      className={cn(
        "flex h-[30px] w-[200px] items-center justify-between p-2 hover:bg-[#E4EBF3]",
        bgcolor
      )}
      {...props}
    >
      {icon}
      {name}
    </a>
  );
};
