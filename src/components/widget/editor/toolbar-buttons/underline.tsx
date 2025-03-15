import { Underline as UnderlineIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import ToolbarButton from "./toolbar-button";

const Underline: React.FC<
  React.PropsWithChildren<
    React.ComponentProps<"button"> & {
      editorRef: React.RefObject<HTMLDivElement>;
    }
  >
> = ({ className, editorRef, ...props }) => {
  const handleCommand = (command: string) => {
    document.execCommand(command, true);
    editorRef?.current?.focus();
  };

  return (
    <ToolbarButton
      className={cn(className)}
      onClick={() => {
        handleCommand("underline");
      }}
      {...props}
    >
      <UnderlineIcon />
    </ToolbarButton>
  );
};
export default Underline;
