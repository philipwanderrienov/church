import { ArrowRight, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardLeaderHistory() {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg text-slate-900">
            Riwayat Hidup Sintua/Syamas
          </CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Profil singkat para pelayan jemaat
          </p>
        </div>
        <Button
          variant="ghost"
          className="gap-2 text-sm text-slate-600 hover:bg-slate-100"
        >
          Lihat Profil
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        {[
          {
            name: "Pnt. R. Simanjuntak",
            role: "Sintua",
            tenure: "2018 - sekarang",
            contact: "021-555-0112",
          },
          {
            name: "S. Hutabarat",
            role: "Syamas",
            tenure: "2020 - sekarang",
            contact: "021-555-0168",
          },
        ].map((profile) => (
          <div
            key={`${profile.name}-${profile.role}`}
            className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
              <Phone className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">{profile.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{profile.role}</p>
                </div>
                <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">
                  {profile.tenure}
                </Badge>
              </div>

              <div className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
                Kontak: {profile.contact}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
