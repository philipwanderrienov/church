import DashboardAnnouncements from "@/components/dashboard/DashboardAnnouncements";
import DashboardChurchFinance from "@/components/dashboard/DashboardChurchFinance";
import DashboardCongregationOverview from "@/components/dashboard/DashboardCongregationOverview";
import DashboardHeroOverview from "@/components/dashboard/DashboardHeroOverview";
import DashboardLeaderHistory from "@/components/dashboard/DashboardLeaderHistory";
import DashboardMinistrySchedules from "@/components/dashboard/DashboardMinistrySchedules";
import DashboardSectorOverview from "@/components/dashboard/DashboardSectorOverview";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardUpcomingEvents from "@/components/dashboard/DashboardUpcomingEvents";
import DashboardQuickActions from "@/components/dashboard/DashboardQuickActions";
import DashboardFinancialOverview from "@/components/dashboard/DashboardFinancialOverview";
import PageLayout from "@/components/PageLayout";

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
