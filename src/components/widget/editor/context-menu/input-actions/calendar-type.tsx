import { CheckIcon } from "lucide-react";

import {
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger
} from "@/components/ui/context-menu";

const CalendarType: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const isGeorgian = rightClickedElement.getAttribute("type") === "date";
  const isJalili = rightClickedElement.hasAttribute("data-jdp");

  return (
    <>
      <ContextMenuSub>
        <ContextMenuSubTrigger>نوع تقویم</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem
            className="flex items-center justify-between"
            onClick={() => {
              if (isGeorgian) return;
              rightClickedElement.removeAttribute("data-jdp-only-time");
              rightClickedElement.removeAttribute("data-jdp-only-date");
              rightClickedElement.removeAttribute("data-jdp");
              rightClickedElement.setAttribute("type", "date");
            }}
          >
            میلادی
            {isGeorgian && <CheckIcon size={16} className="text-primary" />}
          </ContextMenuItem>
          <ContextMenuItem
            className="flex items-center justify-between"
            onClick={() => {
              if (isJalili) return;
              rightClickedElement.setAttribute("data-jdp", "");
              rightClickedElement.setAttribute("type", "text");
            }}
          >
            شمسی
            {isJalili && <CheckIcon size={16} className="text-primary" />}
          </ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
    </>
  );
};
export default CalendarType;
