import { Edge, Node } from "@xyflow/react";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  setNodes: (update: (nodes: Node[]) => Node[]) => void;
  setEdges: (update: (edges: Edge[]) => Edge[]) => void;
}

const useFlowStore = create(
  persist<FlowState>(
    (set) => ({
      nodes: [],
      edges: [],
      setNodes: (update) =>
        set((state) => ({
          nodes: update(state.nodes)
        })),
      setEdges: (update) =>
        set((state) => ({
          edges: update(state.edges)
        }))
    }),
    {
      name: "workflow",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export { useFlowStore };
