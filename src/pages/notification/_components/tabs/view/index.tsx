import React from "react";

interface Props extends React.ComponentProps<"div"> {
  editorRef: React.RefObject<HTMLDivElement>;
}

const ViewTab: React.FC<Props> = () => {
  return <div className="flex items-center gap-x-3"></div>;
};
export default ViewTab;
