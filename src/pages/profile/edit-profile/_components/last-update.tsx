import { CalendarClock } from "lucide-react";

import convertToJalali from "@/helpers";

import { useProfile } from "@/hooks/server-state/use-profile";

const LastUpdate = () => {
  const { data } = useProfile();
  return (
    <div className="flex items-center gap-x-1">
      <CalendarClock size={12} className="text-[#30aab5]" />
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
