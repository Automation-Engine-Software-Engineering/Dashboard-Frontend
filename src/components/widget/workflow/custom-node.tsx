import { Handle, Position, useHandleConnections } from "@xyflow/react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import React, { memo } from "react";

import NodeIcon from "./node-icon";

interface CustomNodeProps {
  data: {
    name: string;
    icon: keyof typeof dynamicIconImports;
  };
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  const { name, icon } = data;

  const targetConnections = useHandleConnections({
    id: "a",
    type: "target"
  });
  const sourceConnections = useHandleConnections({
    id: "b",
    type: "source"
  });

  return (
    <div className="group rounded-md border-2 border-primary bg-white px-4 py-2 shadow-md">
      <div className="flex items-center space-x-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/90 [&_svg]:size-8 [&_svg]:text-slate-900">
          <NodeIcon name={icon} color="white" />
        </div>
        <p className="text-lg font-bold">{name}</p>
      </div>

      <Handle
        id="a"
        type="target"
        position={Position.Left}
        isConnectable={targetConnections.length < 1}
        className="h-3 w-3 rounded-full !bg-slate-500 opacity-0 transition-opacity group-hover:opacity-100"
      />

      <Handle
        id="b"
        type="source"
        position={Position.Right}
        isConnectable={sourceConnections.length < 1}
        className="h-3 w-3 rounded-full !bg-slate-500 opacity-0 transition-opacity group-hover:opacity-100"
      />
    </div>
  );
};

export default memo(CustomNode);
