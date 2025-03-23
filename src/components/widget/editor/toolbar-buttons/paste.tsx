import { ClipboardPasteIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import ToolbarButton from "./toolbar-button";

const Paste: React.FC<
  React.PropsWithChildren<
    React.ComponentProps<"button"> & {
      editorRef: React.RefObject<HTMLDivElement>;
    }
  >
> = ({ className, editorRef, ...props }) => {
  const handleCommand = async () => {
    try {
      const text = await navigator.clipboard.readText();

      if (editorRef.current) {
        const selection = window.getSelection();
        if (selection?.rangeCount) {
          const range = selection.getRangeAt(0);

          if (editorRef.current?.contains(range.commonAncestorContainer)) {
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(text));
            editorRef.current.focus();
          }
        }
      }
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  return (
    <ToolbarButton className={cn(className)} onClick={handleCommand} {...props}>
      <ClipboardPasteIcon />
    </ToolbarButton>
  );
};

export default Paste;
