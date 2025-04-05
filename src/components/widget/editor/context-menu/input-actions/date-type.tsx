import { CheckIcon } from "lucide-react";

import {
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger
} from "@/components/ui/context-menu";

const DateInputType: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const isOnlyDate = rightClickedElement.hasAttribute("data-jdp-only-date");
  const isOnlyTime = rightClickedElement.hasAttribute("data-jdp-only-time");

  return (
    <>
      <ContextMenuSub>
        <ContextMenuSubTrigger>نوع تاریخ</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem
            className="flex items-center justify-between"
            onClick={() => {
              rightClickedElement.removeAttribute("data-jdp-only-time");
              rightClickedElement.setAttribute("data-jdp-only-date", "");
            }}
          >
            تاریخ
            {isOnlyDate && <CheckIcon size={16} className="text-primary" />}
          </ContextMenuItem>
          <ContextMenuItem
            className="flex items-center justify-between"
            onClick={() => {
              rightClickedElement.removeAttribute("data-jdp-only-date");
              rightClickedElement.setAttribute("data-jdp-only-time", "");
            }}
          >
            زمان
            {isOnlyTime && <CheckIcon size={16} className="text-primary" />}
          </ContextMenuItem>
          <ContextMenuItem
            className="flex items-center justify-between"
            onClick={() => {
              rightClickedElement.removeAttribute("data-jdp-only-date");
              rightClickedElement.removeAttribute("data-jdp-only-time");
            }}
          >
            تاریخ و زمان
            {!isOnlyTime && !isOnlyDate && (
              <CheckIcon size={16} className="text-primary" />
            )}
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
    </>
  );
};
export default DateInputType;
