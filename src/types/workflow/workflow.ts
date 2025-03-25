import { Edge, Node } from "@xyflow/react";

export type WorkflowType = {
  id: number;
  name: "string";
  description: "string";
  nodes: Node[];
  edges: Edge[];
};
