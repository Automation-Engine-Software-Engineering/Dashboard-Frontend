import { CheckIcon } from "lucide-react";

import { ContextMenuItem } from "@/components/ui/context-menu";

const ReadOnlyInput: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const isReadOnly = rightClickedElement.getAttribute("data-readonly");

  return (
    <>
      <ContextMenuItem
        onClick={() => {
          if (isReadOnly) {
            rightClickedElement.removeAttribute("data-readonly");
          } else {
            rightClickedElement.setAttribute("data-readonly", "true");
          }
        }}
      >
        نمایشی
        {isReadOnly && <CheckIcon size={16} className="text-primary" />}
      </ContextMenuItem>
    </>
  );
};
export default ReadOnlyInput;
