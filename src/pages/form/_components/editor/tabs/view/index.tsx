import React from "react";

import PreviewForm from "@/components/widget/editor/preview-form";

interface Props extends React.ComponentProps<"div"> {
  editorRef: React.RefObject<HTMLDivElement>;
}

const ViewTab: React.FC<Props> = () => {
  return (
    <div className="flex items-center gap-x-3">
      <PreviewForm />
    </div>
  );
};
export default ViewTab;
