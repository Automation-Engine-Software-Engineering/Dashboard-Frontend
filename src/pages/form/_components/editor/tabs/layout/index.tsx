import { cn } from "@/lib/utils";

import InsertColumns from "@/components/widget/editor/toolbar-buttons/insert-column";

interface Props extends React.ComponentProps<"div"> {
  editorRef: React.RefObject<HTMLDivElement>;
}

const LayoutTab: React.FC<Props> = ({ editorRef, className, ...props }) => {
  return (
    <div className={cn("flex items-center gap-x-3", className)} {...props}>
      <InsertColumns editorRef={editorRef} />
    </div>
  );
};
export default LayoutTab;
