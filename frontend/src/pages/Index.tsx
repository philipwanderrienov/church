import PageLayout from "@/components/PageLayout";
import {
  DashboardHeroOverview,
  DashboardStats,
  DashboardQuickActions,
  DashboardFinancialOverview,
  DashboardUpcomingEvents,
  DashboardCongregationOverview,
  DashboardSectorOverview,
  DashboardChurchFinance,
  DashboardLeaderHistory,
  DashboardMinistrySchedules,
  DashboardAnnouncements,
} from "@/components/dashboard";
import dashboardData from "@/components/dashboard/dashboardData";

export default function Index() {
  return (
    <PageLayout
      title="Dashboard"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Dashboard" }]}
    >
      <div className="space-y-6">
        <DashboardHeroOverview role="pmj" data={dashboardData} />
        <DashboardStats data={dashboardData} />
        <DashboardQuickActions />
        <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
          <DashboardFinancialOverview />
          <DashboardUpcomingEvents />
        </div>
        <DashboardCongregationOverview />
        <DashboardSectorOverview />
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <DashboardChurchFinance />
          <DashboardLeaderHistory />
        </div>
        <DashboardMinistrySchedules />
        <DashboardAnnouncements />
      </div>
    </PageLayout>
  );
}