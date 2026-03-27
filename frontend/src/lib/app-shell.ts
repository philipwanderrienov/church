export type AppRole = "pmj" | "jemaat";

export type AppShellNavItem = {
  title: string;
  href: string;
  roles?: AppRole[];
  exact?: boolean;
};

export const APP_ROLE_LABELS: Record<AppRole, string> = {
  pmj: "PMJ",
  jemaat: "Jemaat",
};

export const APP_ROLE_OPTIONS: { value: AppRole; label: string }[] = [
  { value: "pmj", label: APP_ROLE_LABELS.pmj },
  { value: "jemaat", label: APP_ROLE_LABELS.jemaat },
];

export const APP_SHELL_NAV_ITEMS: AppShellNavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    roles: ["pmj", "jemaat"],
    exact: true,
  },
  {
    title: "Data Jemaat",
    href: "/congregations",
    roles: ["pmj"],
  },
  {
    title: "Organisasi",
    href: "/organization",
    roles: ["pmj"],
  },
  {
    title: "Statistik",
    href: "/statistics",
    roles: ["pmj"],
  },
  {
    title: "Keuangan",
    href: "/finance",
    roles: ["pmj"],
  },
  {
    title: "Pokok Doa",
    href: "/prayer-requests",
    roles: ["pmj", "jemaat"],
  },
];

export function isNavItemVisibleForRole(
  item: AppShellNavItem,
  role: AppRole,
): boolean {
  return !item.roles || item.roles.includes(role);
}

export function getVisibleNavItems(role: AppRole): AppShellNavItem[] {
  return APP_SHELL_NAV_ITEMS.filter((item) =>
    isNavItemVisibleForRole(item, role),
  );
}

export function getRoleLabel(role: AppRole): string {
  return APP_ROLE_LABELS[role];
}

export function isAppRole(value: string | null | undefined): value is AppRole {
  return value === "pmj" || value === "jemaat";
}
