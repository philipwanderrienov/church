import { ArrowRight, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function DashboardCongregationOverview() {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg text-slate-900">Data Jemaat</CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Ringkasan singkat kondisi jemaat saat ini
          </p>
        </div>
        <Button
          asChild
          variant="ghost"
          className="gap-2 text-sm text-slate-600 hover:bg-slate-100"
        >
          <Link to="/users">
            Lihat Detail
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        {[
          {
            label: "Total Jemaat",
            value: "342",
            note: "12 anggota baru bulan ini",
          },
          {
            label: "Sektor Aktif",
            value: "8",
            note: "Tersebar di wilayah pelayanan",
          },
        ].map((item) => {
          const Icon = Users;

          return (
            <div
              key={item.label}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{item.label}</p>
                    <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                      {item.value}
                    </h3>
                  </div>
                  <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">
                    Jemaat
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-slate-500">{item.note}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
