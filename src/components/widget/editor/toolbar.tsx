import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Minus,
  Underline
} from "lucide-react";

import { cn } from "@/lib/utils";

import ToolbarButton from "./toolbar-button";

const Toolbar: React.FC<
  React.PropsWithChildren<
    React.ComponentProps<"div"> & {
      editorRef: React.RefObject<HTMLDivElement>;
    }
  >
> = ({ editorRef, className, ...props }) => {
  return (
    <div className={cn("flex w-full gap-x-2", className)} {...props}>
      <ToolbarButton command="bold" editorRef={editorRef}>
        <Bold />
      </ToolbarButton>
      <ToolbarButton command="italic" editorRef={editorRef}>
        <Italic />
      </ToolbarButton>
      <ToolbarButton command="underline" editorRef={editorRef}>
        <Underline />
      </ToolbarButton>
      <ToolbarButton command="justifyLeft" editorRef={editorRef}>
        <AlignLeft />
      </ToolbarButton>
      <ToolbarButton command="justifyCenter" editorRef={editorRef}>
        <AlignCenter />
      </ToolbarButton>
      <ToolbarButton command="justifyRight" editorRef={editorRef}>
        <AlignRight />
      </ToolbarButton>
      <ToolbarButton command="insertHorizontalRule" editorRef={editorRef}>
        <Minus />
      </ToolbarButton>
    </div>
  );
};

export default Toolbar;
