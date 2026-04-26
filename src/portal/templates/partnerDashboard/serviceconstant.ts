import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { createElement } from "react";

import type { StatCardProps } from "@/common/atoms/statCard/StatCard";

export interface ChartDataPoint {
  time: string;
  value: number;
  active?: boolean;
}

export type ChartFilter = "Last 24 Hours" | "Weekly View";

export const CHART_FILTERS: ChartFilter[] = ["Last 24 Hours", "Weekly View"];

export const PARTNER_DASHBOARD_CONTENT = {
  header: {
    title: "Partner Dashboard",
    subtitle: "Real-time API performance and integration management.",
    generateKeyLabel: "Generate API Key",
  },
  chart: {
    title: "API Request Trends",
  },
  credentials: {
    sectionTitle: "Secure Credentials",
    clientId: {
      label: "CLIENT ID",
      value: "ent_core_prt_8832_x9z2l",
    },
    clientSecret: {
      label: "CLIENT SECRET",
      value: "YOUR_CLIENT_SECRET_HERE",
    },
  },
  basicDashboard: {
    title: "Welcome, ",
    subtitle: "Complete your subscription to unlock advanced analytics, secure credentials, and API management tools.",
    subscribeLabel: "Subscribe Now",
    subscribeHref: "/contact",
    infoCards: [
      { label: "ONBOARDING STATUS", valueKey: "onboardingStatus" as const, default: "Active" },
      { label: "PARTNER CODE", valueKey: "partnerCode" as const, default: "-" },
      { label: "COMPANY", valueKey: "company" as const, default: "" },
    ],
    subscriptionBenefits: {
      title: "Subscription Benefits",
      benefits: [
        {
          title: "Real-time API Analytics",
          description: "Gain deep insights into your integration performance.",
          icon: "analytics"
        },
        {
          title: "Advanced Support",
          description: "Direct access to our senior engineering team.",
          icon: "support"
        },
        {
          title: "Unlimited Sandbox Access",
          description: "Test extensively without hitting rate limits.",
          icon: "sandbox"
        },
        {
          title: "Secure Credentials Management",
          description: "Enhanced security protocols for API keys.",
          icon: "security"
        },
        {
          title: "Priority Feature Request",
          description: "Influence our product roadmap directly.",
          icon: "feature"
        }
      ]
    },
    premiumUpgrade: {
      title: "Premium Upgrade",
      description: "Upgrade to access premium features\nand dedicated support."
    }
  },
};

export const CHART_DATA_24H: ChartDataPoint[] = [
  { time: "00:00", value: 40 },
  { time: "02:00", value: 50 },
  { time: "04:00", value: 45 },
  { time: "06:00", value: 65 },
  { time: "08:00", value: 80 },
  { time: "10:00", value: 95 },
  { time: "12:00", value: 60 },
  { time: "14:00", value: 55 },
  { time: "16:00", value: 70 },
  { time: "18:00", value: 100, active: true },
  { time: "20:00", value: 85 },
  { time: "22:00", value: 75 },
  { time: "23:59", value: 45 },
];

export const CHART_DATA_WEEKLY: ChartDataPoint[] = [
  { time: "Mon", value: 320 },
  { time: "Tue", value: 410 },
  { time: "Wed", value: 380 },
  { time: "Thu", value: 490, active: true },
  { time: "Fri", value: 460 },
  { time: "Sat", value: 210 },
  { time: "Sun", value: 180 },
];

export const CHART_DATA_MAP: Record<ChartFilter, ChartDataPoint[]> = {
  "Last 24 Hours": CHART_DATA_24H,
  "Weekly View": CHART_DATA_WEEKLY,
};

export const STAT_CARDS: Omit<StatCardProps, "className">[] = [
  {
    title: "Total Requests",
    value: "1,284,092",
    indicatorIcon: createElement(ArrowUpwardIcon, { fontSize: "inherit" }),
    indicatorLabel: "12.5%",
    indicatorVariant: "success",
  },
  {
    title: "Success Rate",
    value: "99.98%",
    indicatorIcon: createElement(CheckCircleIcon, { fontSize: "inherit" }),
    indicatorLabel: "Stable",
    indicatorVariant: "success",
  },
  {
    title: "Avg. Latency",
    value: "42ms",
    indicatorIcon: createElement(ShowChartIcon, { fontSize: "inherit" }),
    indicatorLabel: "+3ms",
    indicatorVariant: "warning",
  },
];
