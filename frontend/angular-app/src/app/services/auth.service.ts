import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { ApiResponse } from "../types/api";
import { AuthUser, LoginResponse } from "../models/auth.model";

const CURRENT_USER_KEY = "church_current_user";
const APP_ROLE_KEY = "church_app_role";
const API_BASE_URL = "http://localhost:8000";
const LOGIN_PATH = `${API_BASE_URL}/api/v1/congregations/auth/login`;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly userSubject = new BehaviorSubject<AuthUser | null>(
    this.readUser(),
  );

  readonly user$ = this.userSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  get currentUser(): AuthUser | null {
    return this.userSubject.value;
  }

  getAuthUser(): AuthUser | null {
    return this.currentUser;
  }

  async login(identifier: string, password: string): Promise<LoginResponse> {
    try {
      const response = await firstValueFrom(
        this.http.post<ApiResponse<AuthUser>>(
          LOGIN_PATH,
          { identifier, password },
          {
            headers: new HttpHeaders({
              "Content-Type": "application/json",
              Accept: "application/json",
            }),
          },
        ),
      );

      const user = this.normalizeUser(response.data);
      if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        this.userSubject.next(user);
      }

      return {
        success: Boolean(response.success),
        data: user ?? undefined,
        message: response.message || "Login successful.",
      };
    } catch (error: any) {
      const message =
        error?.error?.message ||
        error?.message ||
        "Terjadi kesalahan saat login. Silakan coba lagi.";
      return {
        success: false,
        message,
      };
    }
  }

  logout(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(APP_ROLE_KEY);
    this.userSubject.next(null);
  }

  private readUser(): AuthUser | null {
    if (typeof window === "undefined") {
      return null;
    }

    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) {
      return null;
    }

    try {
      return this.normalizeUser(JSON.parse(raw));
    } catch {
      return null;
    }
  }

  private normalizeUser(user: unknown): AuthUser | null {
    if (!user || typeof user !== "object") {
      return null;
    }

    const candidate = user as Record<string, unknown>;

    const id = typeof candidate["id"] === "string" ? candidate["id"] : undefined;
    const fullName =
      typeof candidate["fullName"] === "string"
        ? candidate["fullName"]
        : typeof candidate["name"] === "string"
          ? candidate["name"]
          : undefined;
    const email =
      typeof candidate["email"] === "string" ? candidate["email"] : undefined;
    const username =
      typeof candidate["username"] === "string"
        ? candidate["username"]
        : undefined;
    const role =
      typeof candidate["role"] === "string" ? candidate["role"] : undefined;

    if (!id || !fullName || !email || !username || !role) {
      return null;
    }

    return {
      id,
      fullName,
      email,
      username,
      role,
      gender:
        typeof candidate["gender"] === "string"
          ? candidate["gender"]
          : undefined,
      dateOfBirth:
        typeof candidate["dateOfBirth"] === "string"
          ? candidate["dateOfBirth"]
          : typeof candidate["dateofbirth"] === "string"
            ? candidate["dateofbirth"]
            : undefined,
      phoneNumber:
        typeof candidate["phoneNumber"] === "string"
          ? candidate["phoneNumber"]
          : typeof candidate["phone"] === "string"
            ? candidate["phone"]
            : undefined,
      address:
        typeof candidate["address"] === "string" ? candidate["address"] : undefined,
      maritalStatus:
        typeof candidate["maritalStatus"] === "string"
          ? candidate["maritalStatus"]
          : undefined,
      familyCardNumber:
        typeof candidate["familyCardNumber"] === "string"
          ? candidate["familyCardNumber"]
          : undefined,
      sector:
        typeof candidate["sector"] === "string" ? candidate["sector"] : undefined,
      joinDate:
        typeof candidate["joinDate"] === "string"
          ? candidate["joinDate"]
          : undefined,
      photo:
        typeof candidate["photo"] === "string" ? candidate["photo"] : undefined,
      passwordHash:
        typeof candidate["passwordHash"] === "string"
          ? candidate["passwordHash"]
          : undefined,
      congregationId:
        typeof candidate["congregationId"] === "string"
          ? candidate["congregationId"]
          : undefined,
      congregationName:
        typeof candidate["congregationName"] === "string"
          ? candidate["congregationName"]
          : undefined,
    };
  }
}
