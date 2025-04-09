import { cn } from "@/lib/utils";

import { PopoverContent } from "@/components/ui/popover";

const NotificationContent = () => {
  return (
    <PopoverContent>
      <EmptyContent />
    </PopoverContent>
  );
};
export default NotificationContent;

const EmptyContent: React.FC<React.ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div className={cn("text-center", className)} {...props}>
      <p className="text-slate-400">اعلانی یافت نشد</p>
    </div>
  );
};
