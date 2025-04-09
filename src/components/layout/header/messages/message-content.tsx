import { cn } from "@/lib/utils";

import { PopoverContent } from "@/components/ui/popover";

const MessagesContent = () => {
  return (
    <PopoverContent>
      <EmptyContent />
    </PopoverContent>
  );
};
export default MessagesContent;

const EmptyContent: React.FC<React.ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div className={cn("text-center", className)} {...props}>
      <p className="text-slate-400">پیامی یافت نشد</p>
    </div>
  );
};
