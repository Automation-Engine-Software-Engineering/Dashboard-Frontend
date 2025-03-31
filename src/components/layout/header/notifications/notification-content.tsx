import { HashLoader } from "react-spinners";

import { cn } from "@/lib/utils";

import { useNotifications } from "@/hooks/server-state/use-notifications";

const NotificationContent = () => {
  const { data: notifications, isLoading } = useNotifications();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : notifications?.data.length ? (
        notifications?.data.map((notification) => (
          <div className="cursor-pointer select-none border-b border-b-slate-200 px-3 py-3 transition-colors hover:bg-slate-100">
            <p className="line-clamp-1 text-sm">{notification}</p>
          </div>
        ))
      ) : (
        <EmptyContent />
      )}
    </>
  );
};
export default NotificationContent;

const Loading = () => (
  <div className="flex h-full w-full items-center justify-center">
    <HashLoader color="#0099A5" size={25} />
  </div>
);

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
