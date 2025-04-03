import { CheckIcon } from "lucide-react";

import { ContextMenuItem } from "@/components/ui/context-menu";

const TableRepeater: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const container = rightClickedElement.parentElement as HTMLDivElement;
  const hasRepeater =
    (container.querySelector("#table-repeater-wrapper") as HTMLDivElement)
      ?.style.display === "none"
      ? false
      : true;

  return (
    <ContextMenuItem
      className="flex items-center justify-between"
      onClick={() => {
        (
          container.querySelector("#table-repeater-wrapper") as HTMLDivElement
        ).style.display = hasRepeater ? "none" : "flex";
      }}
    >
      تکرار شونده
      {hasRepeater && <CheckIcon size={16} className="text-primary" />}
    </ContextMenuItem>
  );
};

export default TableRepeater;
