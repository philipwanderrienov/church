// Lightweight authentication helpers for the church frontend

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  role: "Jemaat" | "Admin";
  avatar?: string;
}

const AUTH_USER_KEY = "church_auth_user";
const CURRENT_USER_KEY = "church_current_user";

const DUMMY_USER: AuthUser = {
  id: "auth-user-001",
  name: "John Sihotang",
  email: "john.sihotang@church.local",
  username: "johnsihotang",
  password: "church123",
  role: "Admin",
  avatar: "/src/assets/church-hero.jpg",
};

export const DASHBOARD_ROUTE = "/dashboard";
export const LOGIN_ROUTE = "/";

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
      typeof parsed.password === "string" &&
      (parsed.role === "Jemaat" || parsed.role === "Admin")
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

  const currentUser = safeParseAuthUser(localStorage.getItem(CURRENT_USER_KEY));
  if (currentUser) return currentUser;

  const storedUser = safeParseAuthUser(localStorage.getItem(AUTH_USER_KEY));
  return storedUser;
}

export function seedAuthUser(): AuthUser {
  if (!isBrowser()) return DUMMY_USER;

  const existing = safeParseAuthUser(localStorage.getItem(AUTH_USER_KEY));
  if (existing) {
    return existing;
  }

  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(DUMMY_USER));
  return DUMMY_USER;
}

export function login(
  identifier: string,
  password: string,
): { success: boolean; user?: AuthUser; message: string } {
  if (!isBrowser()) {
    return {
      success: false,
      message: "Authentication is only available in the browser.",
    };
  }

  const seededUser = seedAuthUser();
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const matchesIdentity =
    seededUser.email.toLowerCase() === normalizedIdentifier ||
    seededUser.username.toLowerCase() === normalizedIdentifier;

  if (!matchesIdentity) {
    return {
      success: false,
      message: "Invalid email/username or password.",
    };
  }

  if (seededUser.password !== password) {
    return {
      success: false,
      message: "Invalid email/username or password.",
    };
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(seededUser));

  return {
    success: true,
    user: seededUser,
    message: "Login successful.",
  };
}

export function logout() {
  if (!isBrowser()) return;
  localStorage.removeItem(CURRENT_USER_KEY);
}
