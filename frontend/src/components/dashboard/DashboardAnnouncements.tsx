import { ArrowRight, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardAnnouncements } from "@/components/dashboard/dashboardData";

export default function DashboardAnnouncements() {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg text-slate-900">
            Recent Announcements
          </CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Latest updates and news
          </p>
        </div>
        <Button
          variant="ghost"
          className="gap-2 text-sm text-slate-600 hover:bg-slate-100"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        {dashboardAnnouncements.map((announcement) => (
          <div
            key={announcement.title}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="flex items-start gap-4">
              <div
                className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full ${announcement.dotClass}`}
              >
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  {announcement.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {announcement.description}
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  {announcement.meta}
                </p>
              </div>
            </div>
            <Badge className={announcement.badgeClass}>
              {announcement.badge}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}