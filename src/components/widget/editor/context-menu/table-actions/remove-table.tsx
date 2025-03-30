import { ContextMenuItem } from "@/components/ui/context-menu";

const RemoveTable: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const tableContainer = rightClickedElement.parentElement as HTMLDivElement;

  return (
    <>
      <ContextMenuItem className="p-0">
        <label
          className="flex w-full items-center justify-between px-2 py-1.5 text-red-500"
          onClick={() => {
            tableContainer.remove();
          }}
        >
          حذف جدول
        </label>
      </ContextMenuItem>
    </>
  );
};

export default RemoveTable;
