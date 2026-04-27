import { useState } from "react";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import AddIcon from "@mui/icons-material/Add";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import { Link as RouterLink } from "react-router-dom";

import type { PartnerUser } from "@/common/interfaces/auth";
import StatCard from "@/common/atoms/statCard/StatCard";
import SecureCredentialField from "@/common/atoms/secureCredentialField/SecureCredentialField";
import {
  PARTNER_DASHBOARD_CONTENT,
  CHART_DATA_MAP,
  CHART_FILTERS,
  STAT_CARDS,
  type ChartFilter,
} from "./serviceconstant";
import "./PartnerDashboard.scss";

export interface PartnerDashboardTemplateProps {
  partner: PartnerUser | null;
  moduleCount: number;
  apiCount: number;
}

function SubscribedDashboard() {
  const [activeFilter, setActiveFilter] = useState<ChartFilter>("Last 24 Hours");
  const { header, chart, credentials } = PARTNER_DASHBOARD_CONTENT;
  const chartData = CHART_DATA_MAP[activeFilter];

  return (
    <>
      <Box className="partner-dashboard__header">
        <Box>
          <Typography variant="h4" className="partner-dashboard__title">
            {header.title}
          </Typography>
          <Typography className="partner-dashboard__subtitle">{header.subtitle}</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          className="partner-dashboard__generate-btn"
          disableElevation
        >
          {header.generateKeyLabel}
        </Button>
      </Box>

      <Paper className="partner-dashboard__chart-card" elevation={0}>
        <Box className="partner-dashboard__chart-header">
          <Typography variant="h6" className="partner-dashboard__chart-title">
            {chart.title}
          </Typography>
          <Stack direction="row" spacing={1}>
            {CHART_FILTERS.map((filter) => (
              <Chip
                key={filter}
                label={filter}
                variant={filter === activeFilter ? "filled" : "outlined"}
                clickable
                onClick={() => setActiveFilter(filter)}
                className={
                  filter === activeFilter
                    ? "partner-dashboard__filter-active"
                    : "partner-dashboard__filter"
                }
              />
            ))}
          </Stack>
        </Box>
        <Box className="partner-dashboard__chart-container">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#5b6472", fontSize: 13, fontWeight: 600 }}
                dy={10}
              />
              <Tooltip
                cursor={{ fill: "rgba(0, 51, 102, 0.04)", radius: 4 }}
                contentStyle={{
                  backgroundColor: "#003366",
                  border: "none",
                  borderRadius: 8,
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "6px 12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
                labelFormatter={() => ""}
                separator=""
                itemStyle={{ color: "#fff", padding: 0 }}
                formatter={(val: number) => [`${val.toLocaleString()} requests`, ""]}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={50}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.active ? "#E65100" : "rgba(230, 81, 0, 0.2)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      <Box className="partner-dashboard__stats-grid">
        {STAT_CARDS.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </Box>

      <Typography variant="h6" className="partner-dashboard__section-title">
        {credentials.sectionTitle}
      </Typography>
      <Paper className="partner-dashboard__credentials-card" elevation={0}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <SecureCredentialField
            label={credentials.clientId.label}
            value={credentials.clientId.value}
          />
          <SecureCredentialField
            label={credentials.clientSecret.label}
            value={credentials.clientSecret.value}
            masked
          />
        </Stack>
      </Paper>
    </>
  );
}

function BasicDashboard({ partner }: { partner: PartnerUser | null }) {
  const { basicDashboard } = PARTNER_DASHBOARD_CONTENT;

  const getCardIcon = (label: string) => {
    switch (label) {
      case "ONBOARDING STATUS":
        return <CheckCircleOutlinedIcon />;
      case "PARTNER CODE":
        return <VpnKeyOutlinedIcon />;
      case "COMPANY":
        return <BusinessOutlinedIcon />;
      default:
        return null;
    }
  };

  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case "analytics":
        return <AnalyticsOutlinedIcon />;
      case "support":
        return <SupportAgentOutlinedIcon />;
      case "sandbox":
        return <ScienceOutlinedIcon />;
      case "security":
        return <LockOutlinedIcon />;
      case "feature":
        return <WorkspacePremiumOutlinedIcon />;
      default:
        return null;
    }
  };

  return (
    <>
      <Box className="partner-dashboard__header">
        <Box>
          <Typography
            variant="h4"
            className="partner-dashboard__title"
            sx={{ color: "#003366", mb: 3 }}
          >
            {basicDashboard.title}
            {partner?.company || "Partner"}
          </Typography>
        </Box>
      </Box>

      <Box className="partner-dashboard__info-grid">
        {basicDashboard.infoCards.map((card) => (
          <Paper key={card.label} className="partner-dashboard__info-card" elevation={0}>
            <Box className="partner-dashboard__info-icon-wrapper">{getCardIcon(card.label)}</Box>
            <Box>
              <Typography className="partner-dashboard__info-label">{card.label}</Typography>
              <Typography variant="h6" className="partner-dashboard__info-value">
                {(card.valueKey === "company" && partner?.company) ||
                  partner?.[card.valueKey] ||
                  card.default}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      <Box className="partner-dashboard__middle-section">
        {/* Subscription Benefits */}
        <Paper className="partner-dashboard__benefits-card" elevation={0}>
          <Typography variant="h5" className="partner-dashboard__benefits-title">
            {basicDashboard.subscriptionBenefits.title}
          </Typography>
          <Stack spacing={3} className="partner-dashboard__benefits-list">
            {basicDashboard.subscriptionBenefits.benefits.map((benefit, index) => (
              <Box key={index} className="partner-dashboard__benefit-item">
                <Box className="partner-dashboard__benefit-icon-wrapper">
                  {getBenefitIcon(benefit.icon)}
                </Box>
                <Box>
                  <Typography variant="subtitle1" className="partner-dashboard__benefit-name">
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" className="partner-dashboard__benefit-desc">
                    {benefit.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Paper>

        {/* Premium Upgrade */}
        <Paper className="partner-dashboard__upgrade-card-dark" elevation={0}>
          <Box className="partner-dashboard__upgrade-content-dark">
            <Box className="partner-dashboard__upgrade-icon-wrapper-dark">
              <LockOutlinedIcon fontSize="large" />
            </Box>
            <Typography variant="h5" className="partner-dashboard__upgrade-title-dark">
              {basicDashboard.premiumUpgrade.title}
            </Typography>
            <Typography
              className="partner-dashboard__upgrade-desc-dark"
              sx={{ whiteSpace: "pre-line" }}
            >
              {basicDashboard.premiumUpgrade.description}
            </Typography>
            <Button
              component={RouterLink}
              to={basicDashboard.subscribeHref}
              variant="contained"
              className="partner-dashboard__subscribe-btn-dark"
              fullWidth
              disableElevation
            >
              {basicDashboard.subscribeLabel}
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default function PartnerDashboardTemplate({ partner }: PartnerDashboardTemplateProps) {
  return (
    <Box className="partner-dashboard">
      {partner?.isSubscribed ? <SubscribedDashboard /> : <BasicDashboard partner={partner} />}
    </Box>
  );
}
