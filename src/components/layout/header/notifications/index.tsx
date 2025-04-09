import { Bell } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Popover, PopoverTrigger } from "@/components/ui/popover";

import NotificationContent from "./notification-content";

const Notifications: React.FC<React.ComponentProps<"button">> = ({
  className,
  ...props
}) => {
  return (
    <Popover>
      <PopoverTrigger className={cn("group relative", className)} {...props}>
        <Bell
          size={25}
          className="text-white transition-colors group-hover:text-slate-300"
        />
        <Badge className="absolute -right-2 -top-2 bg-[#FC0404]">0</Badge>
      </PopoverTrigger>
      <NotificationContent />
    </Popover>
  );
};
export default Notifications;
