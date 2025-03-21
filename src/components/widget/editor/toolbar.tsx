import { cn } from "@/lib/utils";

import DeleteForm from "./delete-form";
import PreviewForm from "./preview-form";
import SaveForm from "./save-form";
import AlignJustify from "./toolbar-buttons/align-justify";
import AlignLeft from "./toolbar-buttons/align-left";
import AlignRight from "./toolbar-buttons/align-right";
import AlignCenter from "./toolbar-buttons/aligns";
import Bold from "./toolbar-buttons/bold";
import EditorWithFontSize from "./toolbar-buttons/font-size";
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
      <EditorWithFontSize />
      <div className="ms-auto flex gap-x-2">
        <PreviewForm />
        <DeleteForm />
        <SaveForm editorRef={editorRef} />
      </div>
    </div>
  );
};

export default Toolbar;
