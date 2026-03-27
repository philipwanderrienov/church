import { ArrowRight, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardMinistrySchedules() {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg text-slate-900">
            Jadwal Kegiatan Seksi-Seksi
          </CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Agenda pelayanan dan kegiatan rutin jemaat
          </p>
        </div>
        <Button
          variant="ghost"
          className="gap-2 text-sm text-slate-600 hover:bg-slate-100"
        >
          Lihat Jadwal
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        {[
          {
            title: "Pelayanan Kaum Ibu",
            owner: "Seksi Kaum Ibu",
            day: "Sabtu",
            time: "16:00 WIB",
            badge: "Minggu ini",
            badgeClass: "bg-violet-100 text-violet-700 hover:bg-violet-100",
          },
          {
            title: "Persekutuan Doa",
            owner: "Seksi Doa",
            day: "Kamis",
            time: "19:00 WIB",
            badge: "Rutin",
            badgeClass: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
          },
        ].map((activity) => (
          <div
            key={`${activity.title}-${activity.day}`}
            className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {activity.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {activity.owner}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {activity.day} · {activity.time}
                  </p>
                </div>
                <Badge className={activity.badgeClass}>{activity.badge}</Badge>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
