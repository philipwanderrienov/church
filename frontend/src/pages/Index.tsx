import { Bell, Sparkles } from "lucide-react";
import DashboardAnnouncements from "@/components/dashboard/DashboardAnnouncements";
import DashboardFinancialOverview from "@/components/dashboard/DashboardFinancialOverview";
import DashboardQuickActions from "@/components/dashboard/DashboardQuickActions";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardUpcomingEvents from "@/components/dashboard/DashboardUpcomingEvents";
import PageLayout from "@/components/PageLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <PageLayout
      title="Dashboard"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dashboard" },
      ]}
      rightSlot={
        <div className="flex items-center gap-3">
          <Badge className="hidden rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-50 sm:inline-flex">
            <Sparkles className="mr-2 h-4 w-4" />
            Healthy growth this month
          </Badge>
          <Button
            size="icon"
            variant="outline"
            className="border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          >
            <Bell className="h-4 w-4" />
            <span className="sr-only">Open notifications</span>
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <DashboardStats />
        <DashboardQuickActions />
        <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
          <DashboardFinancialOverview />
          <DashboardUpcomingEvents />
        </div>
        <DashboardAnnouncements />
      </div>
    </PageLayout>
  );
}