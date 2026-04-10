export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  username: string;
  role: string;
  gender?: string;
  dateofbirth?: string;
  phone?: string;
  address?: string;
  maritalStatus?: string;
  familyCardNumber?: string;
  sector?: string;
  joinDate?: string;
  photo?: string;
  passwordHash?: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: AuthUser;
  user?: AuthUser;
}
