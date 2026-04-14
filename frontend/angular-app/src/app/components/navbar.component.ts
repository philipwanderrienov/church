import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="navbar">
      <div class="navbar__content container">
        <div class="navbar__text">
          <p class="navbar__eyebrow" *ngIf="roleLabel">{{ roleLabel }}</p>
          <nav
            *ngIf="breadcrumbs?.length"
            aria-label="Breadcrumb"
            class="navbar__breadcrumbs"
          >
            <ng-container *ngFor="let item of breadcrumbs; let last = last">
              <a *ngIf="item.href && !last" [routerLink]="item.href">{{
                item.label
              }}</a>
              <span *ngIf="!item.href || last" [class.is-last]="last">{{
                item.label
              }}</span>
              <span *ngIf="!last" class="navbar__separator">›</span>
            </ng-container>
          </nav>
          <h1 *ngIf="title" class="navbar__title">{{ title }}</h1>
        </div>

        <div class="navbar__actions" *ngIf="currentUser">
          <div class="navbar__user">
            <div class="navbar__user-name">{{ currentUser.fullName }}</div>
            <div class="navbar__user-meta">
              <span *ngIf="currentUser.username">{{ currentUser.username }}</span>
              <span *ngIf="currentUser.congregationName">
                {{ currentUser.congregationName }}
              </span>
              <span *ngIf="currentUser.phoneNumber">{{ currentUser.phoneNumber }}</span>
            </div>
            <div class="navbar__user-role">
              {{ roleText || currentUser.role }}
            </div>
          </div>
          <span class="navbar__badge">{{ roleText || currentUser.role }}</span>
          <button type="button" class="navbar__logout" (click)="logout()">
            Keluar
          </button>
        </div>
      </div>
    </header>
  `,
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  @Input() title = "Dashboard";
  @Input() breadcrumbs: { label: string; href?: string }[] = [];
  @Input() rightSlot: unknown;
  @Input() roleLabel = "";

  currentUser = this.authService.getAuthUser();

  constructor(private readonly authService: AuthService) {}

  get roleText(): string {
    return this.currentUser?.role === "pmj"
      ? "PMJ"
      : this.currentUser?.role === "jemaat"
        ? "Jemaat"
        : "";
  }

  logout(): void {
    this.authService.logout();
    window.location.href = "/login";
  }
}