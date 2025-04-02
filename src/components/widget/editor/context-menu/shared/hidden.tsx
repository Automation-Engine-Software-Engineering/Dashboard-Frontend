import { CheckIcon } from "lucide-react";

import { ContextMenuItem } from "@/components/ui/context-menu";

const HiddenInput: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const isHidden = rightClickedElement.getAttribute("data-hidden");

  return (
    <>
      <ContextMenuItem
        className="flex items-center justify-between"
        onClick={() => {
          if (isHidden) {
            rightClickedElement.removeAttribute("data-hidden");
          } else {
            rightClickedElement.setAttribute("data-hidden", "true");
          }
        }}
      >
        مخفی
        {isHidden && <CheckIcon size={16} className="text-primary" />}
      </ContextMenuItem>
    </>
  );
};
export default HiddenInput;
