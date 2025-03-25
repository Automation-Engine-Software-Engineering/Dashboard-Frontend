import {
  ReactFlow,
  Background,
  Connection,
  addEdge,
  MiniMap,
  Edge,
  Node,
  MarkerType,
  applyEdgeChanges,
  applyNodeChanges
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";

import CustomNode from "./custom-node";

interface Props {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

const Workflow: React.FC<Props> = ({ nodes, edges, setNodes, setEdges }) => {
  const handleConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "step",
            animated: true,
            markerEnd: {
              type: MarkerType.Arrow,
              width: 20,
              height: 20,
              color: "#0099A5"
            },
            style: {
              strokeWidth: 2,
              stroke: "#0099A5"
            }
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const handleNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const handleEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={handleNodesChange}
      onEdgesChange={handleEdgesChange}
      onConnect={handleConnect}
      snapToGrid
      snapGrid={[10, 10]}
      nodeTypes={{ custom: CustomNode }}
    >
      <Background />
      <MiniMap
        pannable
        nodeColor="#0099A5"
        position="top-right"
        maskColor="#0099A520"
      />
    </ReactFlow>
  );
};

export default Workflow;
