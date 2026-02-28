export interface PagedResultDTO<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}