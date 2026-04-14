export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  username: string;
  role: string;
  gender?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  address?: string;
  maritalStatus?: string;
  familyCardNumber?: string;
  sector?: string;
  joinDate?: string;
  photo?: string;
  passwordHash?: string;
  congregationId?: string;
  congregationName?: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: AuthUser;
}