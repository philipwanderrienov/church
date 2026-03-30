import { ChevronRight, LogOut, Settings, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthUser, logout } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface NavbarProps {
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  rightSlot?: React.ReactNode;
  roleLabel?: string;
}

export default function Navbar({
  title = "Dashboard",
  breadcrumbs,
  rightSlot,
  roleLabel,
}: NavbarProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const hasBreadcrumbs = Boolean(breadcrumbs?.length);
  const currentUser = getAuthUser();
  const roleText =
    currentUser?.role === "pmj"
      ? "PMJ"
      : currentUser?.role === "jemaat"
        ? "Jemaat"
        : "";
  const canCreateUsers = currentUser?.role === "pmj";
  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/login", { replace: true });
  };
  const handleSettings = () => {
    setOpen(false);
    navigate("/settings");
  };
  const handleCreateUser = () => {
    setOpen(false);
    navigate("/accounts/new");
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 space-y-1">
          {roleLabel ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {roleLabel}
            </p>
          ) : null}
          {hasBreadcrumbs ? (
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
            >
              {breadcrumbs?.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return (
                  <div
                    key={`${item.label}-${index}`}
                    className="flex items-center gap-1"
                  >
                    {item.href && !isLast ? (
                      <Link
                        to={item.href}
                        className="transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className={isLast ? "text-foreground" : undefined}>
                        {item.label}
                      </span>
                    )}

                    {!isLast && <ChevronRight className="h-4 w-4" />}
                  </div>
                );
              })}
            </nav>
          ) : null}

          {title ? (
            <div className="flex items-center gap-3">
              <h1 className="truncate text-2xl font-semibold tracking-tight text-foreground">
                {title}
              </h1>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-3 lg:justify-end">
          {currentUser ? (
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-auto rounded-lg border border-border bg-background px-3 py-2 hover:bg-muted"
                  onMouseEnter={() => setOpen(true)}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end leading-tight">
                      <span className="text-sm font-semibold text-foreground">
                        {currentUser.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {roleText || currentUser.role}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {roleText || currentUser.role}
                    </Badge>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <DropdownMenuLabel>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {canCreateUsers ? (
                  <DropdownMenuItem onClick={handleCreateUser}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Tambah Jemaat</span>
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuItem onClick={handleSettings}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Setting</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
          {rightSlot}
        </div>
      </div>
    </header>
  );
}
