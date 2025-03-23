import { LinkIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import ToolbarButton from "./toolbar-button";

const InsertLink: React.FC<
  React.PropsWithChildren<
    React.ComponentProps<"button"> & {
      editorRef: React.RefObject<HTMLDivElement>;
    }
  >
> = ({ editorRef, className, ...props }) => {
  const insertLink = () => {
    const selection = window.getSelection();

    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);

      if (editorRef.current?.contains(range.commonAncestorContainer)) {
        const url = prompt("Enter the URL to link to:");
        if (url?.trim()) {
          document.execCommand("createLink", false, url);
          editorRef.current.focus();
        }
      }
    }
  };

  return (
    <ToolbarButton
      onClick={insertLink}
      className={cn("flex size-fit items-center gap-x-2 font-sans", className)}
      {...props}
    >
      <LinkIcon />
      Link
    </ToolbarButton>
  );
};
export default InsertLink;
