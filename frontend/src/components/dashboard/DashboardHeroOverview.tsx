import { BookOpen, CalendarDays, Church, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import dashboardData, { type DashboardData } from "./dashboardData";

type DashboardHeroOverviewProps = {
  role?: string;
  data?: DashboardData;
};

function joinNames(items: { name: string }[], max = 2) {
  if (items.length === 0) return "";
  const names = items
    .slice(0, max)
    .map((item) => item.name)
    .join(", ");
  return items.length > max
    ? `${names}, +${items.length - max} lainnya`
    : names;
}

export function DashboardHeroOverview({
  role = "Jemaat",
  data = dashboardData,
}: DashboardHeroOverviewProps) {
  const weeklyReading = data.weeklyReading ?? {
    title: "Bacaan Alkitab Mingguan",
    passages: [],
  };

  const fullTimers = data.fullTimers ?? [];
  const pmj = data.pmj ?? [];

  return (
    <section className="grid gap-4 lg:grid-cols-12">
      <Card className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm lg:col-span-7">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <Church className="h-3.5 w-3.5" />
                Dashboard {role}
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                  Gareja na sari, martangkupas, janah siboan pasu-pasu
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                  Gabe gareja na matoras mambobai kuria gabe angkula ni Kristus
                  na mangoluh
                </p>
              </div>
            </div>

            <div className="hidden rounded-2xl bg-slate-50 p-4 text-slate-500 sm:block">
              <Users className="h-6 w-6" />
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                <BookOpen className="h-4 w-4 text-emerald-600" />
                Bacaan Minggu Ini
              </div>
              <div className="text-sm font-semibold text-slate-900">
                {weeklyReading.title}
              </div>
              <div className="mt-1 text-xs leading-5 text-slate-600">
                {weeklyReading.passages.length > 0
                  ? weeklyReading.passages.join(" · ")
                  : "Belum ada bacaan yang tersedia."}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                <CalendarDays className="h-4 w-4 text-violet-600" />
                Petugas Full Timer
              </div>
              <div className="text-sm font-semibold text-slate-900">
                {fullTimers.length > 0
                  ? `${fullTimers.length} petugas aktif`
                  : "Belum ada petugas"}
              </div>
              <div className="mt-1 text-xs leading-5 text-slate-600">
                {fullTimers.length > 0
                  ? joinNames(fullTimers)
                  : "Data petugas full timer akan tampil di sini."}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                <Users className="h-4 w-4 text-amber-600" />
                PMJ
              </div>
              <div className="text-sm font-semibold text-slate-900">
                {pmj.length > 0 ? `${pmj.length} anggota` : "Belum ada anggota"}
              </div>
              <div className="mt-1 text-xs leading-5 text-slate-600">
                {pmj.length > 0
                  ? joinNames(pmj)
                  : "Daftar PMJ ringkas untuk dashboard akan ditampilkan di sini."}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-slate-200 bg-slate-900 text-white shadow-sm lg:col-span-5">
        <CardContent className="p-6 sm:p-8">
          <div className="flex h-full flex-col justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
                <Church className="h-3.5 w-3.5" />
                Overview Pelayanan
              </div>
              <h2 className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl">
                Fokus utama minggu ini
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">
                Komponen ini dirancang sebagai landing section yang cepat
                dipindai oleh jemaat maupun PMJ, dengan informasi inti yang
                relevan untuk koordinasi pelayanan.
              </p>
            </div>

            <div className="grid gap-3">
              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-300">
                  Bacaan Alkitab Mingguan
                </div>
                <div className="mt-1 text-sm font-semibold text-white">
                  {weeklyReading.title}
                </div>
                <div className="mt-1 text-xs leading-5 text-slate-300">
                  {weeklyReading.passages.length > 0
                    ? weeklyReading.passages.join(" · ")
                    : "Belum tersedia bacaan minggu ini."}
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 p-4">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-300">
                  Petugas Full Timer dan PMJ
                </div>
                <div className="mt-1 text-sm font-semibold text-white">
                  {fullTimers.length > 0 || pmj.length > 0
                    ? "Koordinasi pelayanan aktif"
                    : "Menunggu data pelayanan"}
                </div>
                <div className="mt-1 text-xs leading-5 text-slate-300">
                  {fullTimers.length > 0
                    ? joinNames(fullTimers)
                    : "Belum ada petugas full timer."}
                  {pmj.length > 0
                    ? ` | PMJ: ${joinNames(pmj)}`
                    : " | PMJ belum tersedia."}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default DashboardHeroOverview;