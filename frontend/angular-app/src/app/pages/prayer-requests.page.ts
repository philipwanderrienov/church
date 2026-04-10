export interface PrayerRequest {
  id: string;
  name: string;
  date: string;
  category: string;
  request: string;
  status: "Pending" | "Prayed" | "Answered";
}

export const createEmptyPrayerRequest = (): Omit<PrayerRequest, "id"> => ({
  name: "",
  date: "",
  category: "General",
  request: "",
  status: "Pending",
});