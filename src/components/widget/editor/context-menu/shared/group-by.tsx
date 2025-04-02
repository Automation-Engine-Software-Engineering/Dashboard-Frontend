import {
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger
} from "@/components/ui/context-menu";

const GroupByInput: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const hasGroup = rightClickedElement.getAttribute("data-group");

  const handleChangeGroup = (group: string) => {
    rightClickedElement.setAttribute("data-group", group);
  };

  const handleRemoveGroup = () => {
    rightClickedElement.removeAttribute("data-group");
  };

  return (
    <>
      <ContextMenuSub>
        <ContextMenuSubTrigger>گروه بندی</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem onClick={() => handleChangeGroup("A")}>
            A
          </ContextMenuItem>
          <ContextMenuItem onClick={() => handleChangeGroup("B")}>
            B
          </ContextMenuItem>
          <ContextMenuItem onClick={() => handleChangeGroup("C")}>
            C
          </ContextMenuItem>
          <ContextMenuItem onClick={() => handleChangeGroup("D")}>
            D
          </ContextMenuItem>
          <ContextMenuItem onClick={() => handleChangeGroup("E")}>
            E
          </ContextMenuItem>
          {hasGroup && (
            <ContextMenuItem
              onClick={handleRemoveGroup}
              className="text-red-500"
            >
              حذف گروه
            </ContextMenuItem>
          )}
        </ContextMenuSubContent>
      </ContextMenuSub>
    </>
  );
};
export default GroupByInput;
