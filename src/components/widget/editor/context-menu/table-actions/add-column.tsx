import { ContextMenuItem } from "@/components/ui/context-menu";

const AddColumn: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const insertColumn = () => {
    const table = rightClickedElement as HTMLTableElement;

    Array.from(table.rows).forEach((row) => {
      const newCell = row.insertCell(-1);
      newCell.textContent = "";
      newCell.contentEditable = "true";
    });
  };

  return (
    <>
      <ContextMenuItem className="p-0" onClick={insertColumn}>
        <label
          className="flex w-full items-center justify-between px-2 py-1.5"
          onClick={(e) => {
            e.stopPropagation();
            insertColumn();
          }}
        >
          اضافه کردن ستون
        </label>
      </ContextMenuItem>
    </>
  );
};

export default AddColumn;
