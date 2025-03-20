import { cn } from "@/lib/utils";

import AlignCenter from "@/components/widget/editor/toolbar-buttons/align-center";
import AlignJustify from "@/components/widget/editor/toolbar-buttons/align-justify";
import AlignLeft from "@/components/widget/editor/toolbar-buttons/align-left";
import AlignRight from "@/components/widget/editor/toolbar-buttons/align-right";
import Bold from "@/components/widget/editor/toolbar-buttons/bold";
import FontSizePicker from "@/components/widget/editor/toolbar-buttons/font-size";
import Italic from "@/components/widget/editor/toolbar-buttons/italic";
import Strikethrough from "@/components/widget/editor/toolbar-buttons/strikethrough";
import TextColorPicker from "@/components/widget/editor/toolbar-buttons/text-color";
import Underline from "@/components/widget/editor/toolbar-buttons/underline";

interface Props extends React.ComponentProps<"div"> {
  editorRef: React.RefObject<HTMLDivElement>;
}

const HomeTab: React.FC<Props> = ({ editorRef, className, ...props }) => {
  return (
    <div className={cn("flex items-center gap-x-3", className)} {...props}>
      <FontSizePicker />
      <Bold editorRef={editorRef} />
      <Italic editorRef={editorRef} />
      <Underline editorRef={editorRef} />
      <Strikethrough editorRef={editorRef} />
      <TextColorPicker editorRef={editorRef} />
      <AlignLeft editorRef={editorRef} />
      <AlignCenter editorRef={editorRef} />
      <AlignRight editorRef={editorRef} />
      <AlignJustify editorRef={editorRef} />
    </div>
  );
};
export default HomeTab;
