import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BellPlus, CalendarPlus, UserPlus, Wallet } from "lucide-react";

export default function DashboardQuickActions() {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg text-slate-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        {[
          {
            label: "Add Member",
            icon: UserPlus,
            className: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
          },
          {
            label: "New Event",
            icon: CalendarPlus,
            className: "bg-sky-50 text-sky-700 hover:bg-sky-100",
          },
          {
            label: "Add Announcement",
            icon: BellPlus,
            className: "bg-violet-50 text-violet-700 hover:bg-violet-100",
          },
          {
            label: "Record Donation",
            icon: Wallet,
            className: "bg-amber-50 text-amber-700 hover:bg-amber-100",
          },
        ].map((action) => {
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
