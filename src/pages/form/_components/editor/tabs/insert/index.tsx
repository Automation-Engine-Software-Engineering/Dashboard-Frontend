import React from "react";

import InsertTable from "@/components/widget/editor/toolbar-buttons/insert-table";

interface Props extends React.ComponentProps<"div"> {
  editorRef: React.RefObject<HTMLDivElement>;
}

const InsertTab: React.FC<Props> = ({ editorRef }) => {
  return (
    <div className="flex items-center gap-x-3">
      <InsertTable editorRef={editorRef} />
    </div>
  );
};
export default InsertTab;
