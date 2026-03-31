// Lightweight authentication helpers for the church frontend

export type AuthRole = "pmj" | "jemaat";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  username: string;
  role: AuthRole;
  avatar?: string;
}

export interface LoginResponse {
  success: boolean;
  user?: AuthUser;
  message: string;
}

const CURRENT_USER_KEY = "church_current_user";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8081";
const LOGIN_PATH = `${API_BASE_URL}/api/v1/congregations/auth/login`;

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function normalizeRole(role: unknown): AuthRole | null {
  if (role === "pmj" || role === "jemaat") return role;
  return null;
}

function safeParseAuthUser(raw: string | null): AuthUser | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<AuthUser> & {
      role?: unknown;
      name?: unknown;
      email?: unknown;
      username?: unknown;
      id?: unknown;
    };

    const role = normalizeRole(parsed.role);

    if (
      parsed &&
      typeof parsed.id === "string" &&
      typeof parsed.name === "string" &&
      typeof parsed.email === "string" &&
      typeof parsed.username === "string" &&
      role
    ) {
      return {
        id: parsed.id,
        name: parsed.name,
        email: parsed.email,
        username: parsed.username,
        role,
        avatar: typeof parsed.avatar === "string" ? parsed.avatar : undefined,
      };
    }
  } catch {
    return null;
  }

  return null;
}

function normalizeAuthUser(user: unknown): AuthUser | null {
  if (!user || typeof user !== "object") return null;

  const candidate = user as Partial<AuthUser> & {
    role?: unknown;
    name?: unknown;
    email?: unknown;
    username?: unknown;
    id?: unknown;
  };

  const role = normalizeRole(candidate.role);

  if (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.email === "string" &&
    typeof candidate.username === "string" &&
    role
  ) {
    return {
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      username: candidate.username,
      role,
      avatar: typeof candidate.avatar === "string" ? candidate.avatar : undefined,
    };
  }

  return null;
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

    let data: LoginResponse & { user?: unknown; message?: string } = {
      success: false,
      message: "Empty response from server.",
    };

    if (rawText) {
      if (contentType.includes("application/json")) {
        try {
          data = JSON.parse(rawText) as LoginResponse & {
            user?: unknown;
            message?: string;
          };
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
    }

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Login gagal. Periksa kembali data Anda.",
      };
    }

    const normalizedUser = normalizeAuthUser(data.user);

    if (normalizedUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(normalizedUser));
    }

    return {
      success: Boolean(data.success),
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
