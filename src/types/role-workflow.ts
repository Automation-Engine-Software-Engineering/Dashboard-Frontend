export type RoleWorkflowType = {
  id: number;
  workflowId: number;
  roleId: number;
  workflow: {
    id: number;
    name: "string";
    description: "string";
    nodes: unknown;
    role_Workflows: unknown[];
    workflowUser: unknown;
  };
  role: unknown;
};
