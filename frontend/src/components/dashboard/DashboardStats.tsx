import { Activity, DollarSign, HeartHandshake, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import dashboardData, {
  type DashboardData,
  type DashboardFinanceSummary,
} from "./dashboardData";

type DashboardStatsProps = {
  data?: DashboardData;
};

const iconMap = {
  members: Users,
  activity: Activity,
  finance: DollarSign,
  prayer: HeartHandshake,
} as const;

function resolveStats(data: DashboardData) {
  const financeByLabel = data.financeSummary.reduce<
    Record<string, DashboardFinanceSummary>
  >((acc, item) => {
    acc[item.label] = item;
    return acc;
  }, {});

  return [
    {
      title: "Total Members",
      value: "342",
      change: "+3.5%",
      description: "12 new this month",
      icon: iconMap.members,
      iconBg: "bg-emerald-100 text-emerald-600",
      trend: "positive" as const,
    },
    {
      title: "Active Members",
      value: "285",
      change: "+2.1%",
      description: "83% of total",
      icon: iconMap.activity,
      iconBg: "bg-teal-100 text-teal-600",
      trend: "positive" as const,
    },
    {
      title: "Total Donations",
      value: financeByLabel["Total Persembahan"]?.value ?? "$45,500",
      change: financeByLabel["Total Persembahan"]?.change ?? "+12.5%",
      description:
        financeByLabel["Total Persembahan"]?.description ?? "This month",
      icon: iconMap.finance,
      iconBg: "bg-green-100 text-green-600",
      trend: "positive" as const,
    },
    {
      title: "Prayer Requests",
      value: "18",
      change: "-5%",
      description: "Active requests",
      icon: iconMap.prayer,
      iconBg: "bg-rose-100 text-rose-600",
      trend: "negative" as const,
    },
  ];
}

export default function DashboardStats({
  data = dashboardData,
}: DashboardStatsProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {resolveStats(data).map((stat) => {
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
