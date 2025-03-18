export type ApiResult<Data> = {
  status: boolean;
  statusId: number;
  message: string;
  data: ApiData<Data>;
};

export type ApiData<Data> = {
  data: Data;
  totalCount: number;
  listSize: number;
  listNumber: number;
};
