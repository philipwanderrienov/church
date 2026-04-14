export const STATISTICS_COLORS = [
  "hsl(38, 75%, 55%)",
  "hsl(220, 25%, 35%)",
  "hsl(38, 60%, 70%)",
  "hsl(220, 20%, 55%)",
  "hsl(0, 72%, 51%)",
] as const;

export function calculateAge(dateOfBirth: string): number {
  const diff = Date.now() - new Date(dateOfBirth).getTime();
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
}