import { WorkflowType } from "./workflow/workflow";

export type MenuItemType = {
  id: number;
  name: string;
  icon: string;
  menuType: number;
  link: string;
  parentMenuElemntId: number;
  workflowId: number;
  roleId: number;
};

export type MenuRoleItemType = {
  name: string;
  menuType: number;
  icon: string;
  workflow: WorkflowType;
  link: string | null;
  childs: MenuRoleItemType[];
};
