import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { NavbarComponent } from "./navbar.component";
import { NavLinkComponent } from "./nav-link.component";

@Component({
  selector: "app-page-layout",
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, NavLinkComponent],
  template: `
    <div class="page-layout">
      <aside class="page-layout__sidebar">
        <div class="page-layout__brand">
          <div class="page-layout__brand-mark">⛪</div>
          <div>
            <p class="page-layout__brand-title">GKPS Tangerang</p>
            <p class="page-layout__brand-subtitle">Church management</p>
          </div>
        </div>

        <p class="page-layout__nav-label">Main Navigation</p>

        <nav class="page-layout__nav">
          <a
            *ngFor="let item of navigation"
            [routerLink]="item.to"
            routerLinkActive="page-layout__nav-link--active"
            [routerLinkActiveOptions]="{ exact: item.exact }"
            class="page-layout__nav-link"
          >
            <span class="page-layout__nav-link-text">{{ item.label }}</span>
          </a>
        </nav>
      </aside>

      <div class="page-layout__content">
        <div class="page-layout__mobile-header">
          <div class="page-layout__brand page-layout__brand--mobile">
            <div class="page-layout__brand-mark">⛪</div>
            <div>
              <p class="page-layout__brand-title">GKPS Tangerang</p>
              <p class="page-layout__brand-subtitle">Church management</p>
            </div>
          </div>

          <nav class="page-layout__mobile-nav">
            <a
              *ngFor="let item of navigation"
              [routerLink]="item.to"
              routerLinkActive="page-layout__mobile-link--active"
              [routerLinkActiveOptions]="{ exact: item.exact }"
              class="page-layout__mobile-link"
            >
              {{ item.label }}
            </a>
          </nav>
        </div>

        <app-navbar [title]="title" [breadcrumbs]="breadcrumbs"></app-navbar>

        <main class="page-layout__main">
          <div class="container">
            <ng-content></ng-content>
          </div>
        </main>
      </div>
    </div>
  `,
  styleUrls: ["./page-layout.component.scss"],
})
export class PageLayoutComponent {
  @Input() title = "Dashboard";
  @Input() breadcrumbs: { label: string; href?: string }[] = [];
  @Input() rightSlot: unknown;

  navigation = [
    { label: "Dashboard", to: "/", exact: true },
    { label: "Jemaat", to: "/congregations", exact: false },
    { label: "Keuangan", to: "/finance", exact: false },
    { label: "Statistik", to: "/statistics", exact: false },
    { label: "Pokok Doa", to: "/prayer-requests", exact: false },
    { label: "Organisasi", to: "/organization", exact: false },
  ];

  constructor(private readonly authService: AuthService) {
    if (!this.authService.getAuthUser()) {
      this.navigation = this.navigation.filter((item) => item.to === "/");
    }
  }
}
