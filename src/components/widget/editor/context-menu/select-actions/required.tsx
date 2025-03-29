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
        onClick={() => {
          if (isRequired) {
            rightClickedElement.removeAttribute("required");
          } else {
            rightClickedElement.setAttribute("required", "true");
          }
        }}
      >
        {isRequired ? "غیر اجباری" : "اجباری"}
      </ContextMenuItem>
    </>
  );
};
export default RequiredInput;
