import { Bell } from "lucide-react";

import { cn } from "@/lib/utils";

import { useNotifications } from "@/hooks/server-state/use-notifications";

import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import NotificationContent from "./notification-content";

const Notifications: React.FC<React.ComponentProps<"button">> = ({
  className,
  ...props
}) => {
  const { data: notifications } = useNotifications();

  return (
    <Popover>
      <PopoverTrigger className={cn("group relative", className)} {...props}>
        <Bell
          size={25}
          className="text-white transition-colors group-hover:text-slate-300"
        />
        <Badge className="absolute -right-2 -top-2 bg-[#FC0404]">
          {notifications?.data.length ?? 0}
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="overflow-hidden p-0">
        <NotificationContent />
      </PopoverContent>
    </Popover>
  );
};
export default Notifications;
