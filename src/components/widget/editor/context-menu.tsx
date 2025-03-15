import {
  ContextMenuContent,
  ContextMenuItem
} from "@/components/ui/context-menu";

import Bold from "./toolbar-buttons/bold";
import Italic from "./toolbar-buttons/italic";
import Underline from "./toolbar-buttons/underline";

const ToolbarContextMenu: React.FC<
  React.ComponentProps<"div"> & {
    editorRef: React.RefObject<HTMLDivElement>;
  }
> = ({ editorRef }) => {
  return (
    <ContextMenuContent>
      <ContextMenuItem className="focus:bg-transparent">
        <div className="flex gap-x-2">
          <Bold editorRef={editorRef} />
          <Italic editorRef={editorRef} />
          <Underline editorRef={editorRef} />
        </div>
      </ContextMenuItem>
    </ContextMenuContent>
  );
};

export default ToolbarContextMenu;
