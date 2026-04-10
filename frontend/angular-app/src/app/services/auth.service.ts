import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ApiResponse } from '../types/api';
import { AuthUser, LoginResponse } from '../models/auth.model';

const CURRENT_USER_KEY = 'church_current_user';
const APP_ROLE_KEY = 'church_app_role';
const API_BASE_URL = 'http://localhost:8081';
const LOGIN_PATH = `${API_BASE_URL}/api/v1/congregations/auth/login`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly userSubject = new BehaviorSubject<AuthUser | null>(this.readUser());

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
        this.http.post<ApiResponse<unknown>>(LOGIN_PATH, { identifier, password }, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }),
          responseType: 'json',
        }),
      );

      const user = this.normalizeUser((response as { user?: unknown; data?: unknown }).user ?? response.data);
      if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        this.userSubject.next(user);
      }

      return {
        success: Boolean(response.success),
        data: user ?? undefined,
        user: user ?? undefined,
        message: response.message || 'Login successful.',
      } as LoginResponse;
    } catch (error: any) {
      const message =
        error?.error?.message ||
        error?.message ||
        'Terjadi kesalahan saat login. Silakan coba lagi.';
      return {
        success: false,
        message,
      } as LoginResponse;
    }
  }

  logout(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(APP_ROLE_KEY);
    this.userSubject.next(null);
  }

  private readUser(): AuthUser | null {
    if (typeof window === 'undefined') {
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
    if (!user || typeof user !== 'object') {
      return null;
    }

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
      candidate['user'] && typeof candidate['user'] === 'object'
        ? (candidate['user'] as Record<string, unknown>)
        : undefined;

    const role = this.normalizeRole(candidate['role']) ?? this.normalizeRole(nestedUser?.['role']);

    const id = typeof candidate['id'] === 'string' ? candidate['id'] : typeof nestedUser?.['id'] === 'string' ? nestedUser['id'] : undefined;
    const fullName =
      typeof candidate['name'] === 'string'
        ? candidate['name']
        : typeof candidate['fullName'] === 'string'
          ? candidate['fullName']
          : typeof nestedUser?.['name'] === 'string'
            ? nestedUser['name']
            : typeof nestedUser?.['fullName'] === 'string'
              ? nestedUser['fullName']
              : undefined;
    const email =
      typeof candidate['email'] === 'string'
        ? candidate['email']
        : typeof nestedUser?.['email'] === 'string'
          ? nestedUser['email']
          : undefined;
    const username =
      typeof candidate['username'] === 'string'
        ? candidate['username']
        : typeof nestedUser?.['username'] === 'string'
          ? nestedUser['username']
          : undefined;

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
        typeof candidate['gender'] === 'string'
          ? candidate['gender']
          : typeof nestedUser?.['gender'] === 'string'
            ? nestedUser['gender']
            : undefined,
      dateofbirth:
        typeof candidate['dateofbirth'] === 'string'
          ? candidate['dateofbirth']
          : typeof nestedUser?.['dateofbirth'] === 'string'
            ? nestedUser['dateofbirth']
            : undefined,
      phone:
        typeof candidate['phone'] === 'string'
          ? candidate['phone']
          : typeof nestedUser?.['phone'] === 'string'
            ? nestedUser['phone']
            : undefined,
      address:
        typeof candidate['address'] === 'string'
          ? candidate['address']
          : typeof nestedUser?.['address'] === 'string'
            ? nestedUser['address']
            : undefined,
      maritalStatus:
        typeof candidate['maritalStatus'] === 'string'
          ? candidate['maritalStatus']
          : typeof nestedUser?.['maritalStatus'] === 'string'
            ? nestedUser['maritalStatus']
            : undefined,
      familyCardNumber:
        typeof candidate['familyCardNumber'] === 'string'
          ? candidate['familyCardNumber']
          : typeof nestedUser?.['familyCardNumber'] === 'string'
            ? nestedUser['familyCardNumber']
            : undefined,
      sector:
        typeof candidate['sector'] === 'string'
          ? candidate['sector']
          : typeof nestedUser?.['sector'] === 'string'
            ? nestedUser['sector']
            : undefined,
      joinDate:
        typeof candidate['joinDate'] === 'string'
          ? candidate['joinDate']
          : typeof nestedUser?.['joinDate'] === 'string'
            ? nestedUser['joinDate']
            : undefined,
      photo:
        typeof candidate['photo'] === 'string'
          ? candidate['photo']
          : typeof candidate['avatar'] === 'string'
            ? candidate['avatar']
            : typeof nestedUser?.['photo'] === 'string'
              ? nestedUser['photo']
              : undefined,
      passwordHash:
        typeof candidate['passwordHash'] === 'string'
          ? candidate['passwordHash']
          : typeof nestedUser?.['passwordHash'] === 'string'
            ? nestedUser['passwordHash']
            : undefined,
    };
  }

  private normalizeRole(role: unknown): string | null {
    return typeof role === 'string' && role.trim().length > 0 ? role.trim() : null;
  }
}
