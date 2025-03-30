import { WorkflowType } from "./workflow/workflow";

export type MenuItemType = {
  id: number;
  name: string;
  menuType: number;
  parentMenuElemntId: number;
  workflowId: number;
  roleId: number;
};

export type MenuRoleItemType = {
  name: string;
  menuType: number;
  workflow: WorkflowType;
  childs: MenuRoleItemType[];
};
