import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardUpcomingEvents } from "@/components/dashboard/dashboardData";

export default function DashboardUpcomingEvents() {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg text-slate-900">
            Upcoming Events
          </CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Next 5 scheduled events
          </p>
        </div>
        <Button
          variant="ghost"
          className="gap-2 text-sm text-slate-600 hover:bg-slate-100"
        >
          View Calendar
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        {dashboardUpcomingEvents.map((event) => (
          <div
            key={`${event.title}-${event.day}`}
            className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4"
          >
            <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <span className="text-[11px] font-semibold uppercase tracking-wide">
                {event.month}
              </span>
              <span className="text-xl font-bold leading-none">
                {event.day}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">{event.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {event.time} · {event.location}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {event.description}
                  </p>
                </div>
                <Badge className={event.badgeClass}>{event.badge}</Badge>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}