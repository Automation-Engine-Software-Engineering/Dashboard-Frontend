import { MessageSquareMore } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Popover, PopoverTrigger } from "@/components/ui/popover";

import MessagesContent from "./message-content";

const Messages: React.FC<React.ComponentProps<"button">> = ({
  className,
  ...props
}) => {
  return (
    <Popover>
      <PopoverTrigger className={cn("group relative", className)} {...props}>
        <MessageSquareMore
          size={25}
          className="fill-white text-[#273646] transition-colors group-hover:fill-slate-300"
        />
        <Badge className="absolute -right-2 -top-2 bg-[#FC0404]">0</Badge>
      </PopoverTrigger>
      <MessagesContent />
    </Popover>
  );
};
export default Messages;
