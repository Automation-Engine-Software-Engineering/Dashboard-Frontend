import { cn } from "@/lib/utils";

import BackgroundColorPicker from "@/components/widget/editor/toolbar-buttons/background-color-picker";
import BackgroundImagePicker from "@/components/widget/editor/toolbar-buttons/background-image-picker";

interface Props extends React.ComponentProps<"div"> {
  editorRef: React.RefObject<HTMLDivElement>;
}

const DesignTab: React.FC<Props> = ({ editorRef, className, ...props }) => {
  return (
    <div className={cn("flex items-center gap-x-3", className)} {...props}>
      <BackgroundImagePicker editorRef={editorRef} />
      <BackgroundColorPicker editorRef={editorRef} />
    </div>
  );
};
export default DesignTab;
