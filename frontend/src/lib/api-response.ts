export interface ApiResponse<TData = unknown> {
  success: boolean;
  data?: TData;
  user?: TData;
  message: string;
  errors?: Record<string, string[]>;
}
