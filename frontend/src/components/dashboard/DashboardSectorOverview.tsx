import { ArrowRight, MapPinned } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardSectorOverview() {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg text-slate-900">Data Sektor</CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Distribusi wilayah dan koordinasi pelayanan
          </p>
        </div>
        <Button
          variant="ghost"
          className="gap-2 text-sm text-slate-600 hover:bg-slate-100"
        >
          Lihat Semua
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        {[
          {
            sector: "Sektor A",
            households: 42,
            activeMembers: 118,
            coordinator: "Pnt. Andri",
          },
          {
            sector: "Sektor B",
            households: 36,
            activeMembers: 101,
            coordinator: "Pnt. Rina",
          },
          {
            sector: "Sektor C",
            households: 29,
            activeMembers: 83,
            coordinator: "Pnt. Dedi",
          },
        ].map((sector) => (
          <div
            key={sector.sector}
            className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
              <MapPinned className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {sector.sector}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Koordinator: {sector.coordinator}
                  </p>
                </div>
                <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">
                  Aktif
                </Badge>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-slate-500">KK</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {sector.households}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-slate-500">Anggota aktif</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {sector.activeMembers}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
