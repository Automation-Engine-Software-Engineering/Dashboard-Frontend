import { CopyIcon } from "lucide-react";

import toast from "react-hot-toast";

import { cn } from "@/lib/utils";

import ToolbarButton from "./toolbar-button";

const Copy: React.FC<
  React.PropsWithChildren<
    React.ComponentProps<"button"> & {
      editorRef: React.RefObject<HTMLDivElement>;
    }
  >
> = ({ className, editorRef, ...props }) => {
  const handleCommand = (command: string) => {
    document.execCommand(command, true);
    editorRef?.current?.focus();
    toast.success("متن کپی شد");
  };

  return (
    <ToolbarButton
      className={cn(className)}
      onClick={() => {
        handleCommand("copy");
      }}
      {...props}
    >
      <CopyIcon />
    </ToolbarButton>
  );
};

export default Copy;
