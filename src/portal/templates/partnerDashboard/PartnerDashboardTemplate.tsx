import { useState, type FC } from "react";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
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
import type { ApiModule } from "@/common/interfaces/api";
import StatCard from "@/common/atoms/statCard/StatCard";
import {
  PARTNER_DASHBOARD_CONTENT,
  CHART_DATA_MAP,
  CHART_FILTERS,
  STAT_CARDS,
  TOP_API_HITS,
  API_SECTION_CONTENT,
  formatCount,
  type ChartFilter,
} from "./serviceconstant";
import "./PartnerDashboard.scss";

export interface PartnerDashboardTemplateProps {
  partner: PartnerUser | null;
  moduleCount: number;
  apiCount: number;
  modules: ApiModule[];
}

interface DashboardSubProps {
  partner: PartnerUser | null;
  modules: ApiModule[];
}

interface ApiCatalogSectionProps {
  modules: ApiModule[];
  isSubscribed: boolean;
}

const ApiCatalogSection: FC<ApiCatalogSectionProps> = ({ modules, isSubscribed }) => {
  const totalApis = modules.reduce((sum, m) => sum + m.apis.length, 0);

  return (
    <Box className="partner-dashboard__api-section">
      <Box className="partner-dashboard__api-section-header">
        <Box>
          <Typography variant="h6" className="partner-dashboard__api-section-title">
            {API_SECTION_CONTENT.title}
          </Typography>
          <Typography className="partner-dashboard__api-section-subtitle">
            {API_SECTION_CONTENT.subtitle(totalApis, modules.length)}
          </Typography>
        </Box>
      </Box>
      <Box className="partner-dashboard__api-section-grid">
        {modules.map((mod) => (
          <Paper
            key={mod.id}
            className={`partner-dashboard__api-card${
              !isSubscribed ? " partner-dashboard__api-card--locked" : ""
            }`}
            elevation={0}
          >
            {isSubscribed ? (
              <Box className="partner-dashboard__api-card-badge">
                <Chip
                  label={API_SECTION_CONTENT.subscribedBadge}
                  size="small"
                  color="success"
                  variant="filled"
                  className="partner-dashboard__api-card-subscribed-chip"
                />
              </Box>
            ) : (
              <Box className="partner-dashboard__api-card-lock-icon">
                <LockOutlinedIcon fontSize="small" />
              </Box>
            )}
            <Typography variant="subtitle1" className="partner-dashboard__api-card-name">
              {mod.name}
            </Typography>
            <Typography variant="body2" className="partner-dashboard__api-card-desc">
              {mod.description}
            </Typography>
            <Box className="partner-dashboard__api-card-meta">
              <Chip
                label={API_SECTION_CONTENT.apiCountLabel(mod.apis.length)}
                size="small"
                variant="outlined"
                className="partner-dashboard__api-card-count-chip"
              />
              {!isSubscribed && (
                <Button
                  component={RouterLink}
                  to={API_SECTION_CONTENT.subscribeHref}
                  variant="contained"
                  size="small"
                  className="partner-dashboard__api-card-subscribe-btn"
                >
                  {API_SECTION_CONTENT.subscribeButtonLabel}
                </Button>
              )}
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

const SubscribedDashboard: FC<DashboardSubProps> = ({ partner, modules }) => {
  const [activeFilter, setActiveFilter] = useState<ChartFilter>("Last 24 Hours");
  const { chart } = PARTNER_DASHBOARD_CONTENT;
  const chartData = CHART_DATA_MAP[activeFilter];

  const createFilterClickHandler = (filterValue: ChartFilter) => () => setActiveFilter(filterValue);

  return (
    <>
      <Box className="partner-dashboard__header">
        <Box>
          <Typography variant="h4" className="partner-dashboard__title">
            Welcome, {partner?.company || "Partner"}
          </Typography>
          <Typography className="partner-dashboard__subtitle">{PARTNER_DASHBOARD_CONTENT.header.subtitle}</Typography>
        </Box>
      </Box>

      <Box className="partner-dashboard__main-layout">
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
                  onClick={createFilterClickHandler(filter)}
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

        <Box className="partner-dashboard__right-panel">
          <StatCard {...STAT_CARDS[0]} />
          <Paper className="partner-dashboard__api-hits-card" elevation={0}>
            <Typography variant="h6" className="partner-dashboard__api-hits-title">
              Top 3 API Hits
            </Typography>
            {TOP_API_HITS.map((hit, index) => (
              <Box key={hit.api} className="partner-dashboard__api-hit-item">
                <Box className="partner-dashboard__api-hit-rank">{index + 1}</Box>
                <Box className="partner-dashboard__api-hit-info">
                  <Typography className="partner-dashboard__api-hit-name">{hit.api}</Typography>
                  <Typography className="partner-dashboard__api-hit-endpoint">{hit.endpoint}</Typography>
                </Box>
                <Typography className="partner-dashboard__api-hit-count">
                  {formatCount(hit.count)}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Box>
      </Box>

      <ApiCatalogSection modules={modules} isSubscribed={true} />
    </>
  );
}

const BasicDashboard: FC<DashboardSubProps> = ({ partner, modules }) => {
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
         
      </Box>

      <ApiCatalogSection modules={modules} isSubscribed={false} />
    </>
  );
}

const PartnerDashboardTemplate: FC<PartnerDashboardTemplateProps> = ({ partner, modules }) => {
  return (
    <Box className="partner-dashboard">
      {partner?.isSubscribed ? (
        <SubscribedDashboard partner={partner} modules={modules} />
      ) : (
        <BasicDashboard partner={partner} modules={modules} />
      )}
    </Box>
  );
};

export default PartnerDashboardTemplate;
