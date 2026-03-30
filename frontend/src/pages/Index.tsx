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

export default function Index() {
  return (
    <PageLayout
      title="Dashboard Jemaat"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Dashboard Jemaat" },
      ]}
    >
      <div className="space-y-6">
        <DashboardHeroOverview role="Jemaat" />
        <DashboardStats />
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
