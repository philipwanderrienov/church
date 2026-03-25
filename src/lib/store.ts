// Simple localStorage-based CRUD store for church data

export interface Congregant {
  id: string;
  fullName: string;
  gender: "Male" | "Female";
  dateOfBirth: string;
  phone: string;
  email: string;
  address: string;
  maritalStatus: "Single" | "Married" | "Widowed" | "Divorced";
  familyCardNumber: string;
  classSector: string;
  rayon: string;
  joinDate: string;
  photo?: string;
}

export interface BoardMember {
  id: string;
  name: string;
  position: string;
  commission: string;
  termStart: string;
  termEnd: string;
  status: "Active" | "Expired";
}

export interface Commission {
  id: string;
  name: string;
  description: string;
  head: string;
  memberCount: number;
}

export interface Donation {
  id: string;
  date: string;
  donorName: string;
  type: "Tithe" | "Offering" | "Special" | "Building Fund";
  amount: number;
  notes: string;
}

export interface PrayerRequest {
  id: string;
  name: string;
  date: string;
  category: string;
  request: string;
  status: "Pending" | "Prayed" | "Answered";
}

function getStore<T>(key: string): T[] {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function setStore<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getAll<T>(key: string): T[] {
  return getStore<T>(key);
}

export function create<T extends { id: string }>(key: string, item: Omit<T, "id">): T {
  const items = getStore<T>(key);
  const newItem = { ...item, id: crypto.randomUUID() } as T;
  items.push(newItem);
  setStore(key, items);
  return newItem;
}

export function update<T extends { id: string }>(key: string, id: string, updates: Partial<T>): T | null {
  const items = getStore<T>(key);
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...updates };
  setStore(key, items);
  return items[index];
}

export function remove(key: string, id: string): boolean {
  const items = getStore<{ id: string }>(key);
  const filtered = items.filter((i) => i.id !== id);
  if (filtered.length === items.length) return false;
  setStore(key, filtered);
  return true;
}

// Seed data
export function seedIfEmpty() {
  if (getStore("congregants").length === 0) {
    const congregants: Omit<Congregant, "id">[] = [
      { fullName: "John Sihotang", gender: "Male", dateOfBirth: "1985-03-15", phone: "081234567890", email: "john@email.com", address: "Jl. Merdeka 10", maritalStatus: "Married", familyCardNumber: "FK-001", classSector: "Sector A", rayon: "Rayon 1", joinDate: "2010-01-15" },
      { fullName: "Maria Simbolon", gender: "Female", dateOfBirth: "1990-07-22", phone: "081234567891", email: "maria@email.com", address: "Jl. Sudirman 5", maritalStatus: "Single", familyCardNumber: "FK-002", classSector: "Sector B", rayon: "Rayon 2", joinDate: "2015-06-10" },
      { fullName: "David Panjaitan", gender: "Male", dateOfBirth: "1978-11-08", phone: "081234567892", email: "david@email.com", address: "Jl. Gatot Subroto 20", maritalStatus: "Married", familyCardNumber: "FK-001", classSector: "Sector A", rayon: "Rayon 1", joinDate: "2008-03-20" },
      { fullName: "Ruth Manurung", gender: "Female", dateOfBirth: "1995-01-30", phone: "081234567893", email: "ruth@email.com", address: "Jl. Diponegoro 15", maritalStatus: "Single", familyCardNumber: "FK-003", classSector: "Sector C", rayon: "Rayon 3", joinDate: "2020-09-01" },
      { fullName: "Samuel Hutapea", gender: "Male", dateOfBirth: "1960-05-12", phone: "081234567894", email: "samuel@email.com", address: "Jl. Ahmad Yani 8", maritalStatus: "Widowed", familyCardNumber: "FK-004", classSector: "Sector A", rayon: "Rayon 1", joinDate: "2000-01-01" },
      { fullName: "Esther Sitorus", gender: "Female", dateOfBirth: "2002-12-25", phone: "081234567895", email: "esther@email.com", address: "Jl. Imam Bonjol 3", maritalStatus: "Single", familyCardNumber: "FK-005", classSector: "Sector B", rayon: "Rayon 2", joinDate: "2022-01-15" },
    ];
    congregants.forEach((c) => create<Congregant>("congregants", c));
  }

  if (getStore("board_members").length === 0) {
    const boards: Omit<BoardMember, "id">[] = [
      { name: "Pdt. Abraham Sinaga", position: "Senior Pastor", commission: "General", termStart: "2023-01-01", termEnd: "2026-12-31", status: "Active" },
      { name: "Ir. Benny Tampubolon", position: "Elder", commission: "Youth", termStart: "2023-01-01", termEnd: "2025-12-31", status: "Active" },
      { name: "Dr. Clara Napitupulu", position: "Deacon", commission: "Women", termStart: "2021-01-01", termEnd: "2024-12-31", status: "Expired" },
      { name: "Drs. Daniel Siahaan", position: "Treasurer", commission: "Finance", termStart: "2024-01-01", termEnd: "2027-12-31", status: "Active" },
    ];
    boards.forEach((b) => create<BoardMember>("board_members", b));
  }

  if (getStore("commissions").length === 0) {
    const commissions: Omit<Commission, "id">[] = [
      { name: "Children Commission", description: "Ministry for children ages 0-12", head: "Sister Martha", memberCount: 15 },
      { name: "Youth Commission", description: "Ministry for youth ages 13-25", head: "Bro. Timothy", memberCount: 30 },
      { name: "Women Commission", description: "Ministry for women of the congregation", head: "Ibu Sarah", memberCount: 45 },
      { name: "Elderly Commission", description: "Ministry for senior congregants", head: "Bpk. Joseph", memberCount: 20 },
    ];
    commissions.forEach((c) => create<Commission>("commissions", c));
  }

  if (getStore("donations").length === 0) {
    const donations: Omit<Donation, "id">[] = [
      { date: "2026-03-23", donorName: "John Sihotang", type: "Tithe", amount: 500000, notes: "March tithe" },
      { date: "2026-03-23", donorName: "Maria Simbolon", type: "Offering", amount: 200000, notes: "Sunday offering" },
      { date: "2026-03-16", donorName: "Anonymous", type: "Special", amount: 1000000, notes: "Easter preparation" },
      { date: "2026-03-16", donorName: "David Panjaitan", type: "Building Fund", amount: 750000, notes: "Church renovation" },
      { date: "2026-03-09", donorName: "Ruth Manurung", type: "Tithe", amount: 300000, notes: "" },
    ];
    donations.forEach((d) => create<Donation>("donations", d));
  }

  if (getStore("prayer_requests").length === 0) {
    const prayers: Omit<PrayerRequest, "id">[] = [
      { name: "Maria Simbolon", date: "2026-03-23", category: "Health", request: "Please pray for my mother's recovery from surgery.", status: "Pending" },
      { name: "Samuel Hutapea", date: "2026-03-20", category: "Family", request: "Pray for unity and peace in our family.", status: "Prayed" },
      { name: "Esther Sitorus", date: "2026-03-18", category: "Career", request: "Pray for my upcoming job interview.", status: "Answered" },
    ];
    prayers.forEach((p) => create<PrayerRequest>("prayer_requests", p));
  }
}
