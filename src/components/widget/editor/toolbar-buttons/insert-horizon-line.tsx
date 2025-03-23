import { MinusIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import ToolbarButton from "./toolbar-button";

const InsertHorizonLine: React.FC<
  React.PropsWithChildren<
    React.ComponentProps<"button"> & {
      editorRef: React.RefObject<HTMLDivElement>;
    }
  >
> = ({ className, editorRef, ...props }) => {
  const handleCommand = (command: string) => {
    const selection = window.getSelection();

    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);

      if (editorRef.current?.contains(range.commonAncestorContainer)) {
        document.execCommand(command, true);
        editorRef?.current?.focus();
      }
    }
  };

  return (
    <ToolbarButton
      className={cn(className)}
      onClick={() => {
        handleCommand("insertHorizontalRule");
      }}
      {...props}
    >
      <MinusIcon />
    </ToolbarButton>
  );
};

export default InsertHorizonLine;
