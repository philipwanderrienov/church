import { type ApiResponse } from "@/lib/api-response";

// Lightweight authentication helpers for the church frontend

export type AuthRole = string;

export interface AuthUser {
  id: string;
  fullName: string;
  gender?: string;
  dateofbirth?: string;
  phone?: string;
  email: string;
  role: AuthRole;
  address?: string;
  maritalStatus?: string;
  familyCardNumber?: string;
  sector?: string;
  joinDate?: string;
  photo?: string;
  username: string;
  passwordHash?: string;
}

export type LoginResponse = ApiResponse<AuthUser>;

const CURRENT_USER_KEY = "church_current_user";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8081";
const LOGIN_PATH = `${API_BASE_URL}/api/v1/congregations/auth/login`;

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function normalizeRole(role: unknown): AuthRole | null {
  if (typeof role === "string" && role.trim().length > 0) {
    return role.trim();
  }

  return null;
}

function normalizeAuthUser(user: unknown): AuthUser | null {
  if (!user || typeof user !== "object") return null;

  const candidate = user as {
    id?: unknown;
    name?: unknown;
    fullName?: unknown;
    email?: unknown;
    username?: unknown;
    role?: unknown;
    avatar?: unknown;
    gender?: unknown;
    dateofbirth?: unknown;
    phone?: unknown;
    address?: unknown;
    maritalStatus?: unknown;
    familyCardNumber?: unknown;
    sector?: unknown;
    joinDate?: unknown;
    photo?: unknown;
    passwordHash?: unknown;
    user?: unknown;
  };

  const nestedUser =
    candidate.user && typeof candidate.user === "object"
      ? (candidate.user as Record<string, unknown>)
      : undefined;

  const role =
    normalizeRole(candidate.role) ??
    normalizeRole(nestedUser?.role) ??
    normalizeRole(nestedUser?.role_name) ??
    normalizeRole(nestedUser?.app_role);

  const id =
    typeof candidate.id === "string"
      ? candidate.id
      : typeof nestedUser?.id === "string"
        ? nestedUser.id
        : undefined;

  const name =
    typeof candidate.name === "string"
      ? candidate.name
      : typeof candidate.fullName === "string"
        ? candidate.fullName
        : typeof nestedUser?.name === "string"
          ? nestedUser.name
          : typeof nestedUser?.fullName === "string"
            ? nestedUser.fullName
            : undefined;

  const email =
    typeof candidate.email === "string"
      ? candidate.email
      : typeof nestedUser?.email === "string"
        ? nestedUser.email
        : undefined;

  const username =
    typeof candidate.username === "string"
      ? candidate.username
      : typeof nestedUser?.username === "string"
        ? nestedUser.username
        : undefined;

  if (
    typeof id === "string" &&
    typeof name === "string" &&
    typeof email === "string" &&
    typeof username === "string" &&
    role
  ) {
    return {
      id,
      fullName: name,
      gender:
        typeof candidate.gender === "string"
          ? candidate.gender
          : typeof nestedUser?.gender === "string"
            ? nestedUser.gender
            : undefined,
      dateofbirth:
        typeof candidate.dateofbirth === "string"
          ? candidate.dateofbirth
          : typeof nestedUser?.dateofbirth === "string"
            ? nestedUser.dateofbirth
            : undefined,
      phone:
        typeof candidate.phone === "string"
          ? candidate.phone
          : typeof nestedUser?.phone === "string"
            ? nestedUser.phone
            : undefined,
      email,
      username,
      role,
      photo:
        typeof candidate.photo === "string"
          ? candidate.photo
          : typeof candidate.avatar === "string"
            ? candidate.avatar
            : typeof nestedUser?.photo === "string"
              ? nestedUser.photo
              : undefined,
      address:
        typeof candidate.address === "string"
          ? candidate.address
          : typeof nestedUser?.address === "string"
            ? nestedUser.address
            : undefined,
      maritalStatus:
        typeof candidate.maritalStatus === "string"
          ? candidate.maritalStatus
          : typeof nestedUser?.maritalStatus === "string"
            ? nestedUser.maritalStatus
            : undefined,
      familyCardNumber:
        typeof candidate.familyCardNumber === "string"
          ? candidate.familyCardNumber
          : typeof nestedUser?.familyCardNumber === "string"
            ? nestedUser.familyCardNumber
            : undefined,
      sector:
        typeof candidate.sector === "string"
          ? candidate.sector
          : typeof nestedUser?.sector === "string"
            ? nestedUser.sector
            : undefined,
      joinDate:
        typeof candidate.joinDate === "string"
          ? candidate.joinDate
          : typeof nestedUser?.joinDate === "string"
            ? nestedUser.joinDate
            : undefined,
      passwordHash:
        typeof candidate.passwordHash === "string"
          ? candidate.passwordHash
          : typeof nestedUser?.passwordHash === "string"
            ? nestedUser.passwordHash
            : undefined,
    };
  }

  return null;
}

function safeParseAuthUser(raw: string | null): AuthUser | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return normalizeAuthUser(parsed);
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
      },
      body: JSON.stringify({ identifier, password }),
    });

    const contentType = response.headers.get("content-type") || "";
    const rawText = await response.text();

    let data: ApiResponse<unknown> = {
      success: response.ok,
      message: "",
    };

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
          message: rawText,
        };
      }
    } else if (!response.ok) {
      return {
        success: false,
        message: "Login gagal. Periksa kembali data Anda.",
      };
    }

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Login gagal. Periksa kembali data Anda.",
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
      data: normalizedUser ?? undefined,
      user: normalizedUser ?? undefined,
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
}
