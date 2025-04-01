import {
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger
} from "@/components/ui/context-menu";

const TableTheme: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const addClassName = (className: string) => {
    rightClickedElement.className = className;
  };

  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger>رنگ بندی</ContextMenuSubTrigger>
      <ContextMenuSubContent>
        <ContextMenuItem
          onClick={() => {
            addClassName("table-black");
          }}
        >
          مشکی
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            addClassName("");
          }}
        >
          خاکستری
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            addClassName("table-blue");
          }}
        >
          آبی
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            addClassName("table-red");
          }}
        >
          قرمز
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            addClassName("table-green");
          }}
        >
          سبز
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            addClassName("table-purple");
          }}
        >
          بنفش
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => {
            addClassName("table-orange");
          }}
        >
          نارنجی
        </ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
  );
};

export default TableTheme;
