import {
  ContextMenuContent,
  ContextMenuItem
} from "@/components/ui/context-menu";

import Bold from "../toolbar-buttons/bold";
import Italic from "../toolbar-buttons/italic";
import Strikethrough from "../toolbar-buttons/strikethrough";
import Underline from "../toolbar-buttons/underline";
import ButtonContextActions from "./button-actions";
import IconContextActions from "./icon-actions";
import InputContextMenuActions from "./input-actions";
import SelectContextActions from "./select-actions";
import TableContextAction from "./table-actions";

const ToolbarContextMenu: React.FC<
  React.ComponentProps<"div"> & {
    editorRef: React.RefObject<HTMLDivElement>;
    rightClickedElement: HTMLElement | null;
  }
> = ({ editorRef, rightClickedElement }) => {
  return (
    <ContextMenuContent>
      {(() => {
        switch (rightClickedElement?.tagName.toUpperCase()) {
          case "INPUT":
            return (
              <InputContextMenuActions
                rightClickedElement={rightClickedElement}
              />
            );
          case "TEXTAREA":
            return (
              <InputContextMenuActions
                rightClickedElement={rightClickedElement}
              />
            );
          case "SELECT":
            return (
              <SelectContextActions rightClickedElement={rightClickedElement} />
            );

          case "I":
            return (
              <IconContextActions rightClickedElement={rightClickedElement} />
            );
          case "TABLE":
            return (
              <TableContextAction rightClickedElement={rightClickedElement} />
            );
          case "BUTTON":
            return (
              <ButtonContextActions rightClickedElement={rightClickedElement} />
            );

          default:
            return (
              <ContextMenuItem className="focus:bg-transparent">
                <div className="flex gap-x-2">
                  <Bold editorRef={editorRef} />
                  <Italic editorRef={editorRef} />
                  <Underline editorRef={editorRef} />
                  <Strikethrough editorRef={editorRef} />
                </div>
              </ContextMenuItem>
            );
        }
      })()}
    </ContextMenuContent>
  );
};

export default ToolbarContextMenu;
