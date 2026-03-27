import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardQuickActions } from "@/components/dashboard/dashboardData";

export default function DashboardQuickActions() {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-slate-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        {dashboardQuickActions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${action.className}`}
              type="button"
            >
              <Icon className="h-4 w-4" />
              {action.label}
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}