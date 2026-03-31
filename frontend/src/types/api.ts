export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ApiSuccessResponse<T> extends ApiResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
  errors?: string[];
}

export interface ApiListResponse<T> extends ApiResponse<T[]> {
  data: T[];
}
