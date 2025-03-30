import { ContextMenuItem } from "@/components/ui/context-menu";

const CurrentDate: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const hasCurrentDate = rightClickedElement.getAttribute("data-current-date");

  return (
    <>
      <ContextMenuItem
        onClick={() => {
          if (hasCurrentDate) {
            rightClickedElement.removeAttribute("data-current-date");
          } else {
            rightClickedElement.setAttribute("data-current-date", "true");
          }
        }}
      >
        {hasCurrentDate ? "تاریخ دستی" : "تاریخ فعلی"}
      </ContextMenuItem>
    </>
  );
};
export default CurrentDate;
