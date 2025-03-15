import { AlignRightIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { checkState } from "@/helpers/editor/check-state";

import { cn } from "@/lib/utils";

import ToolbarButton from "./toolbar-button";

const AlignRight: React.FC<
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
    setIsActive(!!checkState("justifyRight"));
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      setIsActive(!!checkState("justifyRight"));
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
        handleCommand("justifyRight");
      }}
      {...props}
    >
      <AlignRightIcon />
    </ToolbarButton>
  );
};

export default AlignRight;
