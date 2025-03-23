import { ListOrderedIcon, ListIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { checkState } from "@/helpers/editor/check-state";

import { cn } from "@/lib/utils";

import ToolbarButton from "./toolbar-button";

const ListOrder: React.FC<
  React.PropsWithChildren<
    React.ComponentProps<"button"> & {
      editorRef: React.RefObject<HTMLDivElement>;
    }
  >
> = ({ className, editorRef, ...props }) => {
  const [isOrderedList, setIsOrderedList] = useState<boolean>(false);
  const [isUnorderedList, setIsUnorderedList] = useState<boolean>(false);

  const handleCommand = (command: string) => {
    const selection = window.getSelection();

    if (selection?.rangeCount) {
      const range = selection.getRangeAt(0);

      if (editorRef.current?.contains(range.commonAncestorContainer)) {
        document.execCommand(command, false);
        editorRef?.current?.focus();
      }
    }
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      setIsOrderedList(!!checkState("insertOrderedList", editorRef));
      setIsUnorderedList(!!checkState("insertUnorderedList", editorRef));
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return (
    <>
      <ToolbarButton
        className={cn(
          className,
          isOrderedList ? "bg-primary/10" : "bg-transparent"
        )}
        onClick={() => handleCommand("insertOrderedList")}
        {...props}
      >
        <ListOrderedIcon />
      </ToolbarButton>

      <ToolbarButton
        className={cn(
          className,
          isUnorderedList ? "bg-primary/10" : "bg-transparent"
        )}
        onClick={() => handleCommand("insertUnorderedList")}
        {...props}
      >
        <ListIcon />
      </ToolbarButton>
    </>
  );
};

export default ListOrder;
