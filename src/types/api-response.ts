export type ApiResult<Data> = {
  status: boolean;
  statusId: number;
  message: string;
  data: Data;
  totalCount: number;
  listSize: number;
  listNumber: number;
};
