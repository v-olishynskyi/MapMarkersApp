export type PaginationMeta = {
  current_page: number;
  last_page: number;
  next_page: number | null;
  per_page: number;
  prev_page: number | null;
  total: number;
};

export type PaginationResponse<TData> = {
  data: TData[];
  meta: PaginationMeta;
};

export type MessageResponse = {
  message: string;
};
