export interface ApiResponse<TData = unknown> {
  success: boolean;
  message?: string;
  data?: TData;
}

export interface ApiSuccessResponse<TData> extends ApiResponse<TData> {
  success: true;
  data: TData;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface ApiListResponse<TData> extends ApiResponse<TData[]> {
  data: TData[];
}

export interface CongregationSummary {
  Id: string;
  Name: string;
  PastorName?: string | null;
  Location: string;
  PhoneNumber: string;
  Email: string;
  ActiveMembersCount: number;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface User {
  Id: string;
  CongregationId?: string | null;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber?: string | null;
  Role?: string | null;
  Gender?: string | null;
  BirthDate?: string | null;
  Status?: string | null;
  CreatedAt: string;
  UpdatedAt: string;
  Congregation?: CongregationSummary | null;
}

export interface UserFormValues {
  CongregationId?: string | null;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber?: string | null;
  Role?: string | null;
  Gender?: string | null;
  BirthDate?: string | null;
  Status?: string | null;
}

export interface Congregation {
  Id: string;
  Name: string;
  PastorName?: string | null;
  Location: string;
  PhoneNumber: string;
  Email: string;
  ActiveMembersCount: number;
  CreatedAt: string;
  UpdatedAt: string;
  PrayerRequests?: PrayerRequest[];
  FinanceTransactions?: Finance[];
}

export interface PrayerRequest {
  Id: number;
  Name: string;
  Category?: string | null;
  Request: string;
  Status: string;
  CreatedAt?: string | null;
  UpdatedAt?: string | null;
  UserId?: number | null;
  User?: User | null;
}

export interface Finance {
  Id: number;
  Date?: string | null;
  Type: string;
  Amount: number;
  Notes?: string | null;
  CreatedAt?: string | null;
  UpdatedAt?: string | null;
}

export interface OrganizationSummary {
  TotalUsers?: number;
  TotalCongregations?: number;
  TotalPrayerRequests?: number;
  TotalFinances?: number;
}
