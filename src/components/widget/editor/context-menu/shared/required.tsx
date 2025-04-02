import { CheckIcon } from "lucide-react";

import { ContextMenuItem } from "@/components/ui/context-menu";

const RequiredInput: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const isRequired = rightClickedElement.getAttribute("required");

  return (
    <>
      <ContextMenuItem
        className="flex items-center justify-between"
        onClick={() => {
          if (isRequired) {
            rightClickedElement.removeAttribute("required");
          } else {
            rightClickedElement.setAttribute("required", "true");
          }
        }}
      >
        اجباری
        {isRequired && <CheckIcon size={16} className="text-primary" />}
      </ContextMenuItem>
    </>
  );
};
export default RequiredInput;
