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
        onClick={() => {
          if (isDisable) {
            rightClickedElement.removeAttribute("data-disabled");
          } else {
            rightClickedElement.setAttribute("data-disabled", "true");
          }
        }}
      >
        {isDisable ? "فعال" : "غیرفعال"}
      </ContextMenuItem>
    </>
  );
};
export default DisableInput;
