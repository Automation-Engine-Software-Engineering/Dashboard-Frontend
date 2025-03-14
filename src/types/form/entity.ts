import { PropertyType } from "./property";

export type EntityType = {
  id: number;
  previewName: string;
  tableName: string;
  description: string;
  properties: PropertyType[];
  forms: unknown;
  nodes: unknown;
};
