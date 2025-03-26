export type RoleWorkflowType = {
  id: number;
  workFlowId: number;
  roleId: number;
  workFlow: {
    id: number;
    name: "string";
    description: "string";
    nodes: unknown;
    role_WorkFlows: unknown[];
    workFlowUser: unknown;
  };
  role: unknown;
};
