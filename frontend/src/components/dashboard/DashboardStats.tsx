import { Card, CardContent } from "@/components/ui/card";
import { dashboardStats } from "@/components/dashboard/dashboardData";

export default function DashboardStats() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {dashboardStats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="rounded-2xl border-slate-200 shadow-sm"
          >
            <CardContent className="p-6">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">{stat.title}</p>
                  <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                    {stat.value}
                  </h2>
                </div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconBg}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span
                  className={
                    stat.trend === "positive"
                      ? "font-semibold text-emerald-600"
                      : "font-semibold text-rose-600"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-slate-500">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}