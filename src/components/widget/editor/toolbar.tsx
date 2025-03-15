import { cn } from "@/lib/utils";

import AlignCenter from "./toolbar-buttons/align-center";
import AlignJustify from "./toolbar-buttons/align-justify";
import AlignLeft from "./toolbar-buttons/align-left";
import AlignRight from "./toolbar-buttons/align-right";
import Bold from "./toolbar-buttons/bold";
import Italic from "./toolbar-buttons/italic";
import StrikeThrough from "./toolbar-buttons/strikethrough";
import TextColorPicker from "./toolbar-buttons/text-color";
import Underline from "./toolbar-buttons/underline";

const Toolbar: React.FC<
  React.PropsWithChildren<
    React.ComponentProps<"div"> & {
      editorRef: React.RefObject<HTMLDivElement>;
    }
  >
> = ({ editorRef, className, ...props }) => {
  return (
    <div className={cn("flex w-full gap-x-2", className)} {...props}>
      <Bold editorRef={editorRef} />
      <Italic editorRef={editorRef} />
      <Underline editorRef={editorRef} />
      <StrikeThrough editorRef={editorRef} />
      <TextColorPicker editorRef={editorRef} />
      <AlignLeft editorRef={editorRef} />
      <AlignCenter editorRef={editorRef} />
      <AlignRight editorRef={editorRef} />
      <AlignJustify editorRef={editorRef} />
    </div>
  );
};

export default Toolbar;
