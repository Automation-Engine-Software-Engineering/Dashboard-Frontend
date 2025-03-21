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
    document.execCommand(command, false);
    editorRef?.current?.focus();
    setIsActive(alignment);
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      if (checkState("justifyLeft")) {
        setIsActive("left");
      } else if (checkState("justifyRight")) {
        setIsActive("right");
      } else if (checkState("justifyCenter")) {
        setIsActive("center");
      } else if (checkState("justifyFull")) {
        setIsActive("justify");
      } else {
        setIsActive(null);
      }
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
