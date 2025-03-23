import {
  ReactFlow,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  Connection,
  addEdge,
  MarkerType
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect } from "react";

import { useFlowStore } from "@/hooks/store/use-workflow-store";

import CustomNode from "./custom-node";

const Workflow = () => {
  const { nodes, edges, setEdges, setNodes } = useFlowStore();

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((prevEdges) =>
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
          prevEdges
        )
      );
    },
    [setEdges]
  );

  const handleNodesChange = (changes: NodeChange[]) => {
    setNodes((prevNodes) => applyNodeChanges(changes, prevNodes));
  };

  const handleEdgesChange = (changes: EdgeChange[]) => {
    setEdges((prevEdges) => applyEdgeChanges(changes, prevEdges));
  };

  useEffect(() => {
    console.log(nodes, edges);
  }, [nodes, edges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={handleNodesChange}
      onEdgesChange={handleEdgesChange}
      onConnect={onConnect}
      nodeTypes={{ custom: CustomNode }}
    >
      <Background />
    </ReactFlow>
  );
};

export default Workflow;
