import { FormType } from "../form/form";

export type WorkFlowNodeType = {
  id: number;
  name: string;
  description: string;
  workFlowId: number;
  workFlow: {
    id: number;
    name: string;
    description: string;
    nodes: null;
    role_WorkFlows: null;
    workFlowUser: null;
  };
  role_WorkFlows: null;
  workFlowUser: null;
  form: FormType;
};
