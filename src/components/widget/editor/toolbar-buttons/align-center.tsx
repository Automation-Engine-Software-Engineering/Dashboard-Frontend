import { AlignCenterIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { checkState } from "@/helpers/editor/check-state";

import { cn } from "@/lib/utils";

import ToolbarButton from "./toolbar-button";

const AlignCenter: React.FC<
  React.PropsWithChildren<
    React.ComponentProps<"button"> & {
      editorRef: React.RefObject<HTMLDivElement>;
    }
  >
> = ({ className, editorRef, ...props }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleCommand = (command: string) => {
    document.execCommand(command, true);
    editorRef?.current?.focus();
    setIsActive(!!checkState("justifyCenter"));
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      setIsActive(!!checkState("justifyCenter"));
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
        handleCommand("justifyCenter");
      }}
      {...props}
    >
      <AlignCenterIcon />
    </ToolbarButton>
  );
};

export default AlignCenter;
