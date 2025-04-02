import { ContextMenuSeparator } from "@/components/ui/context-menu";

import Relation from "../shared/relations";
import AddColumn from "./add-column";
import ChangeSize from "./change-size";
import TablePadding from "./padding";
import RemoveTable from "./remove-table";
import TableToolbar from "./table-toolbar";
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
      <TableToolbar rightClickedElement={rightClickedElement} />
      <Relation rightClickedElement={rightClickedElement} />
      <ContextMenuSeparator />
      <RemoveTable rightClickedElement={rightClickedElement} />
    </>
  );
};
export default TableContextAction;
