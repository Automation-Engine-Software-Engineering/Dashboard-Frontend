import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";

const Workflow = () => {
  const [nodes, , onNodesChange] = useNodesState<Node>([
    {
      id: "1",
      type: "input",
      data: { label: "An input node" },
      position: { x: 0, y: 50 }
    }
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      className="bg-slate-200"
    />
  );
};

export default Workflow;
