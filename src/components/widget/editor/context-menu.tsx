import { Bold, Italic, Underline } from "lucide-react";

import {
  ContextMenuContent,
  ContextMenuItem
} from "@/components/ui/context-menu";

import ToolbarButton from "./toolbar-button";

const ToolbarContextMenu: React.FC<
  React.ComponentProps<"div"> & {
    editorRef: React.RefObject<HTMLDivElement>;
  }
> = ({ editorRef }) => {
  return (
    <ContextMenuContent>
      <ContextMenuItem className="focus:bg-transparent">
        <div className="flex gap-x-2">
          <ToolbarButton command="bold" editorRef={editorRef}>
            <Bold />
          </ToolbarButton>
          <ToolbarButton command="italic" editorRef={editorRef}>
            <Italic />
          </ToolbarButton>
          <ToolbarButton command="underline" editorRef={editorRef}>
            <Underline />
          </ToolbarButton>
        </div>
      </ContextMenuItem>
    </ContextMenuContent>
  );
};

export default ToolbarContextMenu;
