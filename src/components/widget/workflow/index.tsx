import {
  ReactFlow,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  Connection,
  addEdge,
  MiniMap,
  Edge,
  Node,
  MarkerType
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";

import CustomNode from "./custom-node";

interface Props {
  nodes: Node[];
  edges: Edge[];
  setNodes: (update: (nodes: Node[]) => Node[]) => void;
  setEdges: (update: (edges: Edge[]) => Edge[]) => void;
}

const Workflow: React.FC<Props> = ({ nodes, edges, setNodes, setEdges }) => {
  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges]
  );

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
      <MiniMap nodeColor="#0099A5" position="top-right" maskColor="#0099A520" />
    </ReactFlow>
  );
};

export default Workflow;
