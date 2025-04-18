import React from "react";

import InsertButton from "@/components/widget/editor/toolbar-buttons/insert-button";
import InsertChart from "@/components/widget/editor/toolbar-buttons/insert-chart";
import InsertIcon from "@/components/widget/editor/toolbar-buttons/insert-icon";
import InsertImage from "@/components/widget/editor/toolbar-buttons/insert-image";
import InsertLink from "@/components/widget/editor/toolbar-buttons/insert-link";
import InsertTable from "@/components/widget/editor/toolbar-buttons/insert-table";

interface Props extends React.ComponentProps<"div"> {
  editorRef: React.RefObject<HTMLDivElement>;
}

const InsertTab: React.FC<Props> = ({ editorRef }) => {
  return (
    <div className="flex items-center gap-x-3">
      <InsertTable editorRef={editorRef} />
      <InsertImage editorRef={editorRef} />
      <InsertIcon editorRef={editorRef} />
      <InsertChart editorRef={editorRef} />
      <InsertLink editorRef={editorRef} />
      <InsertButton editorRef={editorRef} />
    </div>
  );
};
export default InsertTab;
