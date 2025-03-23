import { cn } from "@/lib/utils";

import InsertColumns from "@/components/widget/editor/toolbar-buttons/insert-column";
import Orientation from "@/components/widget/editor/toolbar-buttons/orientation";
import PageMargin from "@/components/widget/editor/toolbar-buttons/page-margin";
import PageSize from "@/components/widget/editor/toolbar-buttons/page-size";

interface Props extends React.ComponentProps<"div"> {
  editorRef: React.RefObject<HTMLDivElement>;
}

const LayoutTab: React.FC<Props> = ({ editorRef, className, ...props }) => {
  return (
    <div className={cn("flex items-center gap-x-3", className)} {...props}>
      <PageMargin editorRef={editorRef} />
      <InsertColumns editorRef={editorRef} />
      <Orientation editorRef={editorRef} />
      <PageSize editorRef={editorRef} />
    </div>
  );
};
export default LayoutTab;
