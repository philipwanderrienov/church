import { Component, Input } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-nav-link",
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <a
      [routerLink]="to"
      [routerLinkActive]="activeClassName"
      [routerLinkActiveOptions]="{ exact: exact }"
      [class]="className"
    >
      <ng-content></ng-content>
    </a>
  `,
})
export class NavLinkComponent {
  @Input() to = "/";
  @Input() className = "";
  @Input() activeClassName = "";
  @Input() exact = false;
}
