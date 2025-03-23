import { useParams } from "react-router-dom";

import { cn } from "@/lib/utils";

import BackgroundColorPicker from "@/components/widget/editor/toolbar-buttons/background-color-picker";
import BackgroundImagePicker from "@/components/widget/editor/toolbar-buttons/background-image-picker";

interface Props extends React.ComponentProps<"div"> {
  editorRef: React.RefObject<HTMLDivElement>;
}

const DesignTab: React.FC<Props> = ({ className, ...props }) => {
  const { formId } = useParams<Record<any, string>>();

  return (
    <div className={cn("flex items-center gap-x-3", className)} {...props}>
      <BackgroundImagePicker formId={Number(formId)} />
      <BackgroundColorPicker formId={Number(formId)} />
    </div>
  );
};
export default DesignTab;
