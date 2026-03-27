export type DashboardPerson = {
  name: string;
  role?: string;
  note?: string;
};

export type DashboardReading = {
  title: string;
  passages: string[];
};

export type DashboardData = {
  weeklyReading: DashboardReading;
  fullTimers: DashboardPerson[];
  pmj: DashboardPerson[];
};

export const dashboardData: DashboardData = {
  weeklyReading: {
    title: 'Bacaan Alkitab Mingguan',
    passages: ['Mazmur 23', 'Yohanes 10:1-18', 'Filipi 2:1-11'],
  },
  fullTimers: [
    { name: 'Pdt. Andreas', role: 'Pendeta', note: 'Koordinasi ibadah' },
    { name: 'Suster Maria', role: 'Pelayanan', note: 'Administrasi' },
    { name: 'Diaken Lukas', role: 'Liturgi', note: 'Pendampingan jemaat' },
  ],
  pmj: [
    { name: 'Bapak Samuel', role: 'Ketua' },
    { name: 'Ibu Ester', role: 'Sekretaris' },
    { name: 'Bapak Daniel', role: 'Anggota' },
  ],
};

export default dashboardData;