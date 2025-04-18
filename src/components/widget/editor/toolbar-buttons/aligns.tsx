import {
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon
} from "lucide-react";
import { useEffect, useState } from "react";

import { checkState } from "@/helpers/editor/check-state";

import { cn } from "@/lib/utils";

import ToolbarButton from "./toolbar-button";

const Align: React.FC<
  React.PropsWithChildren<
    React.ComponentProps<"button"> & {
      editorRef: React.RefObject<HTMLDivElement>;
    }
  >
> = ({ className, editorRef, ...props }) => {
  const [isActive, setIsActive] = useState<
    "left" | "right" | "center" | "justify" | null
  >(null);

  const handleCommand = (
    command: string,
    alignment: "left" | "right" | "center" | "justify"
  ) => {
    if (editorRef.current) {
      const selection = window.getSelection();

      if (selection?.rangeCount) {
        const range = selection.getRangeAt(0);
        if (editorRef.current.contains(range.commonAncestorContainer)) {
          document.execCommand(command, false);
          editorRef.current.focus();
          setIsActive(alignment);
        }
      }
    }
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      if (checkState("justifyLeft", editorRef)) {
        setIsActive("left");
      } else if (checkState("justifyRight", editorRef)) {
        setIsActive("right");
      } else if (checkState("justifyCenter", editorRef)) {
        setIsActive("center");
      } else if (checkState("justifyFull", editorRef)) {
        setIsActive("justify");
      } else {
        setIsActive(null);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [editorRef]);

  return (
    <>
      <ToolbarButton
        className={cn(
          className,
          isActive === "left" ? "bg-primary/10" : "bg-transparent"
        )}
        onClick={() => handleCommand("justifyLeft", "left")}
        {...props}
      >
        <AlignLeftIcon />
      </ToolbarButton>

      <ToolbarButton
        className={cn(
          className,
          isActive === "center" ? "bg-primary/10" : "bg-transparent"
        )}
        onClick={() => handleCommand("justifyCenter", "center")}
        {...props}
      >
        <AlignCenterIcon />
      </ToolbarButton>

      <ToolbarButton
        className={cn(
          className,
          isActive === "right" ? "bg-primary/10" : "bg-transparent"
        )}
        onClick={() => handleCommand("justifyRight", "right")}
        {...props}
      >
        <AlignRightIcon />
      </ToolbarButton>

      <ToolbarButton
        className={cn(
          className,
          isActive === "justify" ? "bg-primary/10" : "bg-transparent"
        )}
        onClick={() => handleCommand("justifyFull", "justify")}
        {...props}
      >
        <AlignJustifyIcon />
      </ToolbarButton>
    </>
  );
};

export default Align;
