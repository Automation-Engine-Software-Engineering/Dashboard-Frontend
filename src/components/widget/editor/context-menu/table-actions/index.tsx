import { ContextMenuSeparator } from "@/components/ui/context-menu";

import AddColumn from "./add-column";
import TablePadding from "./padding";
import RemoveTable from "./remove-table";

interface Props extends React.ComponentProps<"div"> {
  rightClickedElement: HTMLElement;
}

const TableContextAction: React.FC<Props> = ({ rightClickedElement }) => {
  return (
    <>
      <AddColumn rightClickedElement={rightClickedElement} />
      <TablePadding rightClickedElement={rightClickedElement} />
      <ContextMenuSeparator />
      <RemoveTable rightClickedElement={rightClickedElement} />
    </>
  );
};
export default TableContextAction;
