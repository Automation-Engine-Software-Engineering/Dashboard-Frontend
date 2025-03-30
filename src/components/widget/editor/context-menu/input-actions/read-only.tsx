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
        {isReadOnly ? "غیر نمایشی" : "نمایشی"}
      </ContextMenuItem>
    </>
  );
};
export default ReadOnlyInput;
