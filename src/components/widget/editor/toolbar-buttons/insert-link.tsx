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
    const url = prompt("Enter the URL to link to:");
    if (url && editorRef.current) {
      editorRef.current.focus();
      document.execCommand("createLink", false, url);
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
