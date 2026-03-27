import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface NavbarProps {
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  rightSlot?: React.ReactNode;
}

export default function Navbar({
  title = "Dashboard",
  breadcrumbs,
  rightSlot,
}: NavbarProps) {
  const hasBreadcrumbs = Boolean(breadcrumbs?.length);

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 space-y-1">
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

        {rightSlot ? (
          <div className="flex items-center gap-3 lg:justify-end">
            {rightSlot}
          </div>
        ) : null}
      </div>
    </header>
  );
}
