import { cn } from "@/lib/utils";

import DeleteForm from "./delete-form";
import PreviewForm from "./preview-form";
import SaveForm from "./save-form";
import Align from "./toolbar-buttons/aligns";
import Bold from "./toolbar-buttons/bold";
import FontPicker from "./toolbar-buttons/font-size";
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
      <Align editorRef={editorRef} />
      <FontPicker editorRef={editorRef} />
      <div className="ms-auto flex gap-x-2">
        <PreviewForm />
        <DeleteForm />
        <SaveForm editorRef={editorRef} />
      </div>
    </div>
  );
};

export default Toolbar;
