import { Edge, Node } from "@xyflow/react";

import { create } from "zustand";

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  setNodes: (update: (nodes: Node[]) => Node[]) => void;
  setEdges: (update: (edges: Edge[]) => Edge[]) => void;
}

export const useFlowStore = create<FlowState>((set) => ({
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
}));
