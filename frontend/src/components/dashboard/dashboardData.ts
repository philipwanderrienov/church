import {
  Activity,
  Calendar,
  DollarSign,
  HeartHandshake,
  HeartPulse,
  MenuSquare,
  Plus,
  Receipt,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ChartConfig } from "@/components/ui/chart";

export type DashboardStat = {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  trend: "positive" | "negative";
};

export type DashboardQuickAction = {
  label: string;
  icon: LucideIcon;
  className: string;
};

export type DashboardFinanceDatum = {
  month: string;
  income: number;
  expenses: number;
};

export type DashboardEvent = {
  month: string;
  day: string;
  title: string;
  time: string;
  location: string;
  description: string;
  badge: string;
  badgeClass: string;
};

export type DashboardAnnouncement = {
  title: string;
  description: string;
  meta: string;
  badge: string;
  badgeClass: string;
  dotClass: string;
};

export const dashboardStats: DashboardStat[] = [
  {
    title: "Total Members",
    value: "342",
    change: "+3.5%",
    description: "12 new this month",
    icon: Users,
    iconBg: "bg-emerald-100 text-emerald-600",
    trend: "positive",
  },
  {
    title: "Active Members",
    value: "285",
    change: "+2.1%",
    description: "83% of total",
    icon: Activity,
    iconBg: "bg-teal-100 text-teal-600",
    trend: "positive",
  },
  {
    title: "Total Donations",
    value: "$45,500",
    change: "+12.5%",
    description: "This month",
    icon: DollarSign,
    iconBg: "bg-green-100 text-green-600",
    trend: "positive",
  },
  {
    title: "Prayer Requests",
    value: "18",
    change: "-5%",
    description: "Active requests",
    icon: HeartHandshake,
    iconBg: "bg-rose-100 text-rose-600",
    trend: "negative",
  },
];

export const dashboardQuickActions: DashboardQuickAction[] = [
  {
    label: "Add Member",
    icon: Plus,
    className: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  },
  {
    label: "Create Event",
    icon: Calendar,
    className: "bg-amber-50 text-amber-700 hover:bg-amber-100",
  },
  {
    label: "Record Transaction",
    icon: Receipt,
    className: "bg-violet-50 text-violet-700 hover:bg-violet-100",
  },
  {
    label: "Post Announcement",
    icon: MenuSquare,
    className: "bg-rose-50 text-rose-700 hover:bg-rose-100",
  },
  {
    label: "Prayer Request",
    icon: HeartPulse,
    className: "bg-cyan-50 text-cyan-700 hover:bg-cyan-100",
  },
];

export const dashboardFinanceData: DashboardFinanceDatum[] = [
  { month: "Jan", income: 42000, expenses: 30000 },
  { month: "Feb", income: 39000, expenses: 27000 },
  { month: "Mar", income: 46000, expenses: 33000 },
  { month: "Apr", income: 0, expenses: 0 },
  { month: "May", income: 0, expenses: 0 },
  { month: "Jun", income: 0, expenses: 0 },
];

export const dashboardUpcomingEvents: DashboardEvent[] = [
  {
    month: "Mar",
    day: "31",
    title: "Sunday Service",
    time: "9:00 AM",
    location: "Main Sanctuary",
    description: "Weekly Sunday worship service",
    badge: "Service",
    badgeClass: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  },
  {
    month: "Mar",
    day: "31",
    title: "Easter Celebration",
    time: "8:00 AM",
    location: "Main Sanctuary",
    description: "Annual Easter Sunday celebration",
    badge: "Event",
    badgeClass: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  },
  {
    month: "Apr",
    day: "3",
    title: "Youth Bible Study",
    time: "6:30 PM",
    location: "Youth Center",
    description: "Weekly youth group meeting",
    badge: "Meeting",
    badgeClass: "bg-violet-100 text-violet-700 hover:bg-violet-100",
  },
  {
    month: "Apr",
    day: "6",
    title: "Leadership Meeting",
    time: "10:00 AM",
    location: "Conference Room",
    description: "Monthly leadership team meeting",
    badge: "Meeting",
    badgeClass: "bg-sky-100 text-sky-700 hover:bg-sky-100",
  },
];

export const dashboardAnnouncements: DashboardAnnouncement[] = [
  {
    title: "Easter Sunday Services",
    description:
      "Join us for special Easter services at 8am, 10am, and 12pm. Invite your friends and family to celebrate the resurrection!",
    meta: "Pastor John · about 2 years ago",
    badge: "Urgent",
    badgeClass: "bg-rose-100 text-rose-700 hover:bg-rose-100",
    dotClass: "bg-rose-100 text-rose-500",
  },
  {
    title: "Volunteer Sign-ups Open",
    description:
      "We need volunteers for the upcoming community outreach event. Sign up at the welcome desk or online.",
    meta: "Admin Team · about 2 years ago",
    badge: "Normal",
    badgeClass: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
    dotClass: "bg-emerald-100 text-emerald-500",
  },
  {
    title: "Youth Summer Camp Registration",
    description:
      "Registration for youth summer camp is now open. Early bird pricing available until April 15th.",
    meta: "Youth Ministry · about 2 years ago",
    badge: "Normal",
    badgeClass: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
    dotClass: "bg-emerald-100 text-emerald-500",
  },
];

export const dashboardChartConfig = {
  income: {
    label: "Income",
    color: "#10b981",
  },
  expenses: {
    label: "Expenses",
    color: "#d4a72c",
  },
} satisfies ChartConfig;