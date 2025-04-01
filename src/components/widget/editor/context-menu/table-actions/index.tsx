import { ContextMenuSeparator } from "@/components/ui/context-menu";

import AddColumn from "./add-column";
import ChangeSize from "./change-size";
import TablePadding from "./padding";
import RemoveTable from "./remove-table";
import TableTheme from "./theme";

interface Props extends React.ComponentProps<"div"> {
  rightClickedElement: HTMLElement;
}

const TableContextAction: React.FC<Props> = ({ rightClickedElement }) => {
  return (
    <>
      <AddColumn rightClickedElement={rightClickedElement} />
      <ChangeSize rightClickedElement={rightClickedElement} />
      <TablePadding rightClickedElement={rightClickedElement} />
      <TableTheme rightClickedElement={rightClickedElement} />
      <ContextMenuSeparator />
      <RemoveTable rightClickedElement={rightClickedElement} />
    </>
  );
};
export default TableContextAction;
