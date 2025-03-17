import { CalendarClock } from "lucide-react";

import convertToJalali from "@/helpers/convertFile";

import { useSession } from "@/hooks/server-state/use-session";

const LastUpdate = () => {
  const { data } = useSession();
  return (
    <div className="flex items-center gap-x-1">
      <CalendarClock size={12} />
      <p className="">
        {data?.lastEdit ? (
          <>آخرین بروزرسانی: {convertToJalali(data?.lastEdit)}</>
        ) : (
          <>ویرایش انجام نشده است</>
        )}
      </p>
    </div>
  );
};

export default LastUpdate;
