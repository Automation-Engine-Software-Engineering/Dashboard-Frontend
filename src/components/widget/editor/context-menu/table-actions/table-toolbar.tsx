import { CheckIcon } from "lucide-react";

import {
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger
} from "@/components/ui/context-menu";

const TableToolbar: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  if (!rightClickedElement?.id) return <></>;

  const container = rightClickedElement.parentElement as HTMLDivElement;
  const hasSearch =
    (container.querySelector("#table-search-wrapper") as HTMLDivElement).style
      .display === "none"
      ? false
      : true;

  const hasPagination =
    (container.querySelector("#table-pagination-wrapper") as HTMLDivElement)
      .style.display === "none"
      ? false
      : true;

  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger>ابزار</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem
          className="flex items-center justify-between"
          onClick={() => {
            (
              container.querySelector("#table-search-wrapper") as HTMLDivElement
            ).style.display = hasSearch ? "none" : "flex";
          }}
        >
          سرچ
          {hasSearch && <CheckIcon size={16} className="text-primary" />}
        </ContextMenuItem>
        <ContextMenuItem
          className="flex items-center justify-between"
          onClick={() => {
            (
              container.querySelector(
                "#table-pagination-wrapper"
              ) as HTMLDivElement
            ).style.display = hasPagination ? "none" : "flex";
          }}
        >
          صفحه بندی
          {hasPagination && <CheckIcon size={16} className="text-primary" />}
        </ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
  );
};

export default TableToolbar;
