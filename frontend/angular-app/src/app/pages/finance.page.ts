export interface Donation {
  id: string;
  date: string;
  donorName: string;
  type: "Tithe" | "Offering" | "Special" | "Building Fund";
  amount: number;
  notes: string;
}

export const createEmptyDonation = (): Omit<Donation, "id"> => ({
  date: "",
  donorName: "",
  type: "Offering",
  amount: 0,
  notes: "",
});

export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
