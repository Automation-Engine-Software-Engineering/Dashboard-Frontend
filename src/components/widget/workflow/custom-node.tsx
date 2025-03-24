import { Handle, Position } from "@xyflow/react";
import { NotepadText } from "lucide-react";
import React, { memo } from "react";

interface CustomNodeProps {
  data: {
    name: string;
  };
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  const { name } = data;
  return (
    <div className="group rounded-md border-2 border-primary bg-white px-4 py-2 shadow-md">
      <div className="flex items-center space-x-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 [&_svg]:size-8 [&_svg]:text-slate-900">
          <NotepadText />
        </div>
        <p className="text-lg font-bold">{name}</p>
      </div>

      <Handle
        id="b"
        type="target"
        position={Position.Left}
        className="h-3 w-3 rounded-full !bg-slate-500 opacity-0 transition-opacity group-hover:opacity-100"
      />

      <Handle
        id="d"
        type="source"
        position={Position.Right}
        className="h-3 w-3 rounded-full !bg-slate-500 opacity-0 transition-opacity group-hover:opacity-100"
      />
    </div>
  );
};

export default memo(CustomNode);
