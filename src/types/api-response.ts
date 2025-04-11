export type ApiResult<Data> = {
  status: boolean;
  statusId: number;
  message: string;
  data: Data;
  page: number;
  totalResult: number;
};
