import {
  BarChart3,
  Building2,
  Church,
  Coins,
  HeartHandshake,
  LayoutDashboard,
} from "lucide-react";

import { NavLink } from "./NavLink";
import Navbar from "./Navbar";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  rightSlot?: React.ReactNode;
}

const navigationItems = [
  {
    label: "Dashboard",
    to: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Jemaat",
    to: "/congregations",
    icon: Building2,
  },
  {
    label: "Keuangan",
    to: "/finance",
    icon: Coins,
  },
  {
    label: "Statistik",
    to: "/statistics",
    icon: BarChart3,
  },
  {
    label: "Pokok Doa",
    to: "/prayer-requests",
    icon: HeartHandshake,
  },
  {
    label: "Organisasi",
    to: "/organization",
    icon: Church,
  },
];

export default function PageLayout({
  children,
  title,
  breadcrumbs,
  rightSlot,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-border bg-background lg:flex lg:flex-col">
          <div className="flex h-20 items-center border-b border-border px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Church className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold leading-none text-foreground">
                  GKPS Tangerang
                </p>
                <p className="text-xs text-muted-foreground">
                  Church management
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 px-4 py-6">
            <p className="px-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Main Navigation
            </p>

            <nav className="mt-4 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    activeClassName="bg-primary text-primary-foreground shadow-sm hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-border bg-background lg:hidden">
            <div className="flex items-center gap-3 px-4 py-4 sm:px-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Church className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  GKPS Tangerang
                </p>
                <p className="text-xs text-muted-foreground">Church management</p>
              </div>
            </div>

            <nav className="flex gap-2 overflow-x-auto px-4 pb-4 sm:px-6">
              {navigationItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-background px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    activeClassName="border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <Navbar title={title} breadcrumbs={breadcrumbs} rightSlot={rightSlot} />

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}