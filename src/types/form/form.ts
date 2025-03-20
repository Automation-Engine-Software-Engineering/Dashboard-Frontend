import { EntityType } from "./entity";

export type FormType = {
  id: number;
  name: string;
  description: string;
  sizeWidth: number;
  sizeHeight: number;
  isAutoHeight: boolean;
  backgroundColor: string;
  backgroundImgPath: string;
  htmlFormBody: string;
  isRepeatedImage: boolean;
  entities: EntityType[] | null;
};
