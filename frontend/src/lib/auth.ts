import { type ApiResponse } from "@/lib/api-response";
import { clearPersistedAppRole } from "@/hooks/use-app-role";

export type AuthRole = string;

export interface AuthUser {
  id: string;
  fullName: string;
  gender?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  email: string;
  role: AuthRole;
  address?: string;
  maritalStatus?: string;
  familyCardNumber?: string;
  congregationId?: string | number;
  congregationName?: string;
  joinDate?: string;
  photo?: string;
  username: string;
  passwordHash?: string;
}

export type LoginResponse = ApiResponse<AuthUser> & {
  user?: AuthUser;
};

const CURRENT_USER_KEY = "church_current_user";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";
const LOGIN_PATH = `${API_BASE_URL}/api/v1/congregations/auth/login`;

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : undefined;
}

function normalizeRole(role: unknown): AuthRole | null {
  const normalized = asString(role);
  return normalized ?? null;
}

function normalizeAuthUser(user: unknown): AuthUser | null {
  if (!user || typeof user !== "object") return null;

  const candidate = user as Record<string, unknown>;
  const nestedUser =
    candidate.user && typeof candidate.user === "object"
      ? (candidate.user as Record<string, unknown>)
      : undefined;

  const id =
    asString(candidate.id) ??
    asString(candidate.Id) ??
    asString(nestedUser?.id) ??
    asString(nestedUser?.Id);
  const fullName =
    asString(candidate.fullName) ??
    asString(candidate.FullName) ??
    asString(candidate.name) ??
    asString(candidate.Name) ??
    asString(nestedUser?.fullName) ??
    asString(nestedUser?.FullName) ??
    asString(nestedUser?.name) ??
    asString(nestedUser?.Name);
  const email =
    asString(candidate.email) ??
    asString(candidate.Email) ??
    asString(nestedUser?.email) ??
    asString(nestedUser?.Email);
  const username =
    asString(candidate.username) ??
    asString(candidate.Username) ??
    asString(nestedUser?.username) ??
    asString(nestedUser?.Username);
  const role =
    normalizeRole(candidate.role) ??
    normalizeRole(candidate.Role) ??
    normalizeRole(nestedUser?.role) ??
    normalizeRole(nestedUser?.Role) ??
    normalizeRole(nestedUser?.role_name) ??
    normalizeRole(nestedUser?.app_role);

  if (!id || !fullName || !email || !username || !role) return null;

  return {
    id,
    fullName,
    gender:
      asString(candidate.gender) ??
      asString(candidate.Gender) ??
      asString(nestedUser?.gender) ??
      asString(nestedUser?.Gender),
    dateOfBirth:
      asString(candidate.dateOfBirth) ??
      asString(candidate.DateOfBirth) ??
      asString(candidate.dateofbirth) ??
      asString(candidate.dateOfBirth) ??
      asString(nestedUser?.dateOfBirth) ??
      asString(nestedUser?.DateOfBirth) ??
      asString(nestedUser?.dateofbirth),
    phoneNumber:
      asString(candidate.phoneNumber) ??
      asString(candidate.PhoneNumber) ??
      asString(candidate.phone) ??
      asString(nestedUser?.phoneNumber) ??
      asString(nestedUser?.PhoneNumber) ??
      asString(nestedUser?.phone),
    email,
    role,
    address:
      asString(candidate.address) ??
      asString(candidate.Address) ??
      asString(nestedUser?.address) ??
      asString(nestedUser?.Address),
    maritalStatus:
      asString(candidate.maritalStatus) ??
      asString(candidate.MaritalStatus) ??
      asString(nestedUser?.maritalStatus) ??
      asString(nestedUser?.MaritalStatus),
    familyCardNumber:
      asString(candidate.familyCardNumber) ??
      asString(candidate.FamilyCardNumber) ??
      asString(nestedUser?.familyCardNumber) ??
      asString(nestedUser?.FamilyCardNumber),
    congregationId:
      asString(candidate.congregationId) ??
      asString(candidate.CongregationId) ??
      asString(nestedUser?.congregationId) ??
      asString(nestedUser?.CongregationId),
    congregationName:
      asString(candidate.congregationName) ??
      asString(candidate.CongregationName) ??
      asString(nestedUser?.congregationName) ??
      asString(nestedUser?.CongregationName),
    joinDate:
      asString(candidate.joinDate) ??
      asString(candidate.JoinDate) ??
      asString(nestedUser?.joinDate) ??
      asString(nestedUser?.JoinDate),
    photo:
      asString(candidate.photo) ??
      asString(candidate.Photo) ??
      asString(candidate.avatar) ??
      asString(candidate.Avatar) ??
      asString(nestedUser?.photo) ??
      asString(nestedUser?.Photo),
    username,
    passwordHash:
      asString(candidate.passwordHash) ??
      asString(candidate.PasswordHash) ??
      asString(nestedUser?.passwordHash) ??
      asString(nestedUser?.PasswordHash),
  };
}

function safeParseAuthUser(raw: string | null): AuthUser | null {
  if (!raw) return null;

  try {
    return normalizeAuthUser(JSON.parse(raw));
  } catch {
    return null;
  }
}

function normalizeLoginUserPayload(user: unknown): AuthUser | null {
  return normalizeAuthUser(user);
}

export function getAuthUser(): AuthUser | null {
  if (!isBrowser()) return null;
  return safeParseAuthUser(localStorage.getItem(CURRENT_USER_KEY));
}

export async function login(
  identifier: string,
  password: string,
): Promise<LoginResponse> {
  if (!isBrowser()) {
    return {
      success: false,
      message: "Authentication is only available in the browser.",
    };
  }

  try {
    const response = await fetch(LOGIN_PATH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ identifier, password }),
      mode: "cors",
    });

    const contentType = response.headers.get("content-type") || "";
    const rawText = await response.text();

    let data: ApiResponse<unknown> = {
      success: response.ok,
      message: "",
    };

    const fallbackErrorMessage = response.ok
      ? ""
      : `Login gagal (${response.status}).`;

    if (rawText) {
      if (contentType.includes("application/json")) {
        try {
          data = JSON.parse(rawText) as ApiResponse<unknown>;
        } catch {
          return {
            success: false,
            message: "Server returned invalid JSON.",
          };
        }
      } else {
        return {
          success: false,
          message: rawText || fallbackErrorMessage || "Login gagal.",
        };
      }
    } else if (!response.ok) {
      return {
        success: false,
        message:
          fallbackErrorMessage || "Login gagal. Periksa kembali data Anda.",
      };
    }

    if (!response.ok) {
      return {
        success: false,
        message:
          data.message ||
          fallbackErrorMessage ||
          "Login gagal. Periksa kembali data Anda.",
      };
    }

    const normalizedUser = normalizeLoginUserPayload(
      (data as { user?: unknown; data?: unknown }).user ??
        (data as { user?: unknown; data?: unknown }).data,
    );

    if (normalizedUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(normalizedUser));
    }

    return {
      success: Boolean(data.success),
      user: normalizedUser ?? undefined,
      data: normalizedUser ?? undefined,
      message: data.message || "Login successful.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat login. Silakan coba lagi.",
    };
  }
}

export function logout() {
  if (!isBrowser()) return;
  localStorage.removeItem(CURRENT_USER_KEY);
  clearPersistedAppRole();
}
