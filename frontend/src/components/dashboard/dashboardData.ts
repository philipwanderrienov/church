export type DashboardPerson = {
  name: string;
  role?: string;
  note?: string;
};

export type DashboardReading = {
  title: string;
  passages: string[];
};

export type DashboardFinanceSummary = {
  label: string;
  value: string;
  change?: string;
  description?: string;
};

export type DashboardDataSourceStatus = "local" | "api";

export type DashboardData = {
  source: DashboardDataSourceStatus;
  weeklyReading: DashboardReading;
  fullTimers: DashboardPerson[];
  pmj: DashboardPerson[];
  financeSummary: DashboardFinanceSummary[];
};

export type DashboardApiWeeklyReading = {
  id: string;
  service_date: string;
  title: string;
  passage: string;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type DashboardApiPerson = {
  id?: string;
  name: string;
  role?: string | null;
  note?: string | null;
};

export type DashboardApiFinanceSummary = {
  label: string;
  value: number | string;
  change?: number | string | null;
  description?: string | null;
};

export type DashboardApiData = {
  weeklyReading?: DashboardApiWeeklyReading | null;
  fullTimers?: DashboardApiPerson[];
  pmj?: DashboardApiPerson[];
  financeSummary?: DashboardApiFinanceSummary[];
};

export const dashboardData: DashboardData = {
  source: "local",
  weeklyReading: {
    title: "Bacaan Alkitab Mingguan",
    passages: ["Mazmur 23", "Yohanes 10:1-18", "Filipi 2:1-11"],
  },
  fullTimers: [
    { name: "Pdt. Andreas", role: "Pendeta", note: "Koordinasi ibadah" },
    { name: "Suster Maria", role: "Pelayanan", note: "Administrasi" },
    { name: "Diaken Lukas", role: "Liturgi", note: "Pendampingan jemaat" },
  ],
  pmj: [
    { name: "Bapak Samuel", role: "Ketua" },
    { name: "Ibu Ester", role: "Sekretaris" },
    { name: "Bapak Daniel", role: "Anggota" },
  ],
  financeSummary: [
    {
      label: "Total Persembahan",
      value: "$45,500",
      change: "+12.5%",
      description: "This month",
    },
    {
      label: "Persembahan Minggu Ini",
      value: "$8,250",
      change: "+3.8%",
      description: "Last 7 days",
    },
  ],
};

export function mapWeeklyReadingFromApi(
  weeklyReading?: DashboardApiWeeklyReading | null,
): DashboardReading {
  if (!weeklyReading) {
    return {
      title: "Bacaan Alkitab Mingguan",
      passages: [],
    };
  }

  const passages = weeklyReading.passage
    .split(",")
    .map((passage) => passage.trim())
    .filter(Boolean);

  return {
    title: weeklyReading.title || "Bacaan Alkitab Mingguan",
    passages,
  };
}

export function mapDashboardApiData(
  data: DashboardApiData | null | undefined,
): DashboardData {
  return {
    source: "api",
    weeklyReading: mapWeeklyReadingFromApi(data?.weeklyReading),
    fullTimers:
      data?.fullTimers?.map((person) => ({
        name: person.name,
        role: person.role ?? undefined,
        note: person.note ?? undefined,
      })) ?? [],
    pmj:
      data?.pmj?.map((person) => ({
        name: person.name,
        role: person.role ?? undefined,
        note: person.note ?? undefined,
      })) ?? [],
    financeSummary:
      data?.financeSummary?.map((summary) => ({
        label: summary.label,
        value:
          typeof summary.value === "number"
            ? summary.value.toLocaleString("id-ID")
            : summary.value,
        change:
          typeof summary.change === "number"
            ? `${summary.change > 0 ? "+" : ""}${summary.change}`
            : summary.change ?? undefined,
        description: summary.description ?? undefined,
      })) ?? [],
  };
}

export default dashboardData;