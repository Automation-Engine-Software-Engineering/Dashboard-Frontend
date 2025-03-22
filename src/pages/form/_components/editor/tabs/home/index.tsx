import { cn } from "@/lib/utils";

import Align from "@/components/widget/editor/toolbar-buttons/aligns";
import Bold from "@/components/widget/editor/toolbar-buttons/bold";
import FontSizePicker from "@/components/widget/editor/toolbar-buttons/font-size";
import InsertHorizonLine from "@/components/widget/editor/toolbar-buttons/insert-horizon-line";
import Italic from "@/components/widget/editor/toolbar-buttons/italic";
import ListOrder from "@/components/widget/editor/toolbar-buttons/list-order";
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
      <Align editorRef={editorRef} />
      <ListOrder editorRef={editorRef} />
      <InsertHorizonLine editorRef={editorRef} />
    </div>
  );
};
export default HomeTab;
