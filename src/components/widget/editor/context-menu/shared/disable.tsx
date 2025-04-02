import { CheckIcon } from "lucide-react";

import { ContextMenuItem } from "@/components/ui/context-menu";

const DisableInput: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const isDisable = rightClickedElement.getAttribute("data-disabled");

  return (
    <>
      <ContextMenuItem
        className="flex items-center justify-between"
        onClick={() => {
          if (isDisable) {
            rightClickedElement.removeAttribute("data-disabled");
          } else {
            rightClickedElement.setAttribute("data-disabled", "true");
          }
        }}
      >
        غیرفعال
        {isDisable && <CheckIcon size={16} className="text-primary" />}
      </ContextMenuItem>
    </>
  );
};
export default DisableInput;
