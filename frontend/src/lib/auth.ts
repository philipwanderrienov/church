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

function safeParseAuthUser(raw: string | null): AuthUser | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as AuthUser;
    if (
      parsed &&
      typeof parsed.id === "string" &&
      typeof parsed.name === "string" &&
      typeof parsed.email === "string" &&
      typeof parsed.username === "string" &&
      (parsed.role === "pmj" || parsed.role === "jemaat")
    ) {
      return parsed;
    }
  } catch {
    return null;
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

    let data: LoginResponse & { user?: AuthUser; message?: string } = {
      success: false,
      message: "Empty response from server.",
    };

    if (rawText) {
      if (contentType.includes("application/json")) {
        try {
          data = JSON.parse(rawText) as LoginResponse & {
            user?: AuthUser;
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

    if (data.user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(data.user));
    }

    return {
      success: Boolean(data.success),
      user: data.user,
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
