export interface ApiResponse<TData = unknown> {
  success: boolean;
  data?: TData;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface ApiListResponse<TData> extends ApiResponse<TData[]> {
  data: TData[];
}
