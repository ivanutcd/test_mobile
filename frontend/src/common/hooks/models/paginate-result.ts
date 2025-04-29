export interface PaginateResult<TResult> {
  currentPage: number;
  lastPage: number;
  pageSize: number;
  total: number;
  data: Array<TResult>;
  pageSizeOptions: Array<number>;
  changePage: (value: number) => void;
  changeSizePage: (value: number) => void;
}
