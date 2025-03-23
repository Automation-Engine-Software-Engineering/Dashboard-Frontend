import { Italic as ItalicIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { checkState } from "@/helpers/editor/check-state";

import { cn } from "@/lib/utils";

import ToolbarButton from "./toolbar-button";

const Italic: React.FC<
  React.PropsWithChildren<
    React.ComponentProps<"button"> & {
      editorRef: React.RefObject<HTMLDivElement>;
    }
  >
> = ({ className, editorRef, ...props }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleCommand = (command: string) => {
    const selection = window.getSelection();

    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);

      if (editorRef.current?.contains(range.commonAncestorContainer)) {
        document.execCommand(command, true);
        editorRef?.current?.focus();
        setIsActive(!!checkState("italic", editorRef));
      }
    }
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      setIsActive(!!checkState("italic", editorRef));
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return (
    <ToolbarButton
      className={cn(className, isActive ? "bg-primary/10" : "bg-transparent")}
      onClick={() => {
        handleCommand("italic");
      }}
      {...props}
    >
      <ItalicIcon />
    </ToolbarButton>
  );
};

export default Italic;
