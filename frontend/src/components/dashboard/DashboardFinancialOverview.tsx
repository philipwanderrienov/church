import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  dashboardChartConfig,
  dashboardFinanceData,
} from "@/components/dashboard/dashboardData";

export default function DashboardFinancialOverview() {
  const totalIncome = useMemo(
    () => dashboardFinanceData.reduce((sum, item) => sum + item.income, 0),
    [],
  );

  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg text-slate-900">
            Financial Overview
          </CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Income vs Expenses (Last 6 months)
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
      <CardContent className="pt-4">
        <div className="mb-4 flex items-center gap-4 text-sm text-slate-500">
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            Income
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-500" />
            Expenses
          </span>
          <span className="ml-auto font-medium text-slate-700">
            Total income: ${totalIncome.toLocaleString()}
          </span>
        </div>

        <ChartContainer
          config={dashboardChartConfig}
          className="h-[280px] w-full"
        >
          <BarChart data={dashboardFinanceData} barGap={10}>
            <CartesianGrid vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey="income"
              fill="var(--color-income)"
              radius={[8, 8, 0, 0]}
              maxBarSize={30}
            />
            <Bar
              dataKey="expenses"
              fill="var(--color-expenses)"
              radius={[8, 8, 0, 0]}
              maxBarSize={30}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}