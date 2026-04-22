import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import { Link as RouterLink } from "react-router-dom";

import type { PartnerUser } from "@/common/interfaces/auth";
import { PARTNER_DASHBOARD_CONTENT } from "./serviceconstant";
import "./PartnerDashboard.scss";

export interface PartnerDashboardTemplateProps {
  partner: PartnerUser | null;
  moduleCount: number;
  apiCount: number;
}

function getStatusLabel(status: PartnerUser["onboardingStatus"] | undefined) {
  if (!status) return PARTNER_DASHBOARD_CONTENT.status.review;
  return PARTNER_DASHBOARD_CONTENT.status[status];
}

export default function PartnerDashboardTemplate({
  partner,
  moduleCount,
  apiCount,
}: PartnerDashboardTemplateProps) {
  return (
    <Box className="partner-dashboard">
      <Box className="partner-dashboard__hero">
        <Typography variant="overline" className="partner-dashboard__hero-overline">
          {PARTNER_DASHBOARD_CONTENT.hero.overline}
        </Typography>
        <Typography variant="h3" className="partner-dashboard__hero-title">
          {partner
            ? `Welcome back, ${partner.fullName.split(" ")[0]}`
            : PARTNER_DASHBOARD_CONTENT.hero.title}
        </Typography>
        <Typography className="partner-dashboard__hero-description">
          {PARTNER_DASHBOARD_CONTENT.hero.description}
        </Typography>

        <Box className="partner-dashboard__hero-metrics">
          <Box className="partner-dashboard__metric-card">
            <Typography className="partner-dashboard__metric-value">{moduleCount}</Typography>
            <Typography className="partner-dashboard__metric-label">API modules</Typography>
          </Box>
          <Box className="partner-dashboard__metric-card">
            <Typography className="partner-dashboard__metric-value">{apiCount}</Typography>
            <Typography className="partner-dashboard__metric-label">Protected endpoints</Typography>
          </Box>
          <Box className="partner-dashboard__metric-card">
            <Typography className="partner-dashboard__metric-value">
              {partner?.partnerCode ?? "PH-01"}
            </Typography>
            <Typography className="partner-dashboard__metric-label">Partner code</Typography>
          </Box>
        </Box>
      </Box>

      <Box className="partner-dashboard__grid">
        <Box className="partner-dashboard__cards">
          <Paper className="partner-dashboard__card">
            <Box className="partner-dashboard__card-icon">
              <HubOutlinedIcon />
            </Box>
            <Typography variant="h6" className="partner-dashboard__card-title">
              {PARTNER_DASHBOARD_CONTENT.actions.apiProducts.title}
            </Typography>
            <Typography className="partner-dashboard__card-description">
              {PARTNER_DASHBOARD_CONTENT.actions.apiProducts.description}
            </Typography>
            <Button
              component={RouterLink}
              to={PARTNER_DASHBOARD_CONTENT.actions.apiProducts.href}
              variant="contained"
              color="primary"
              className="partner-dashboard__card-button"
            >
              {PARTNER_DASHBOARD_CONTENT.actions.apiProducts.cta}
            </Button>
          </Paper>

          <Paper className="partner-dashboard__card">
            <Box className="partner-dashboard__card-icon">
              <ScienceOutlinedIcon />
            </Box>
            <Typography variant="h6" className="partner-dashboard__card-title">
              {PARTNER_DASHBOARD_CONTENT.actions.sandbox.title}
            </Typography>
            <Typography className="partner-dashboard__card-description">
              {PARTNER_DASHBOARD_CONTENT.actions.sandbox.description}
            </Typography>
            <Button
              component={RouterLink}
              to={PARTNER_DASHBOARD_CONTENT.actions.sandbox.href}
              variant="contained"
              color="primary"
              className="partner-dashboard__card-button"
            >
              {PARTNER_DASHBOARD_CONTENT.actions.sandbox.cta}
            </Button>
          </Paper>
        </Box>

        <Paper className="partner-dashboard__sidebar">
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <DashboardCustomizeOutlinedIcon color="secondary" />
            <Typography variant="h6" className="partner-dashboard__sidebar-title">
              Partner workspace
            </Typography>
          </Stack>
          <Typography className="partner-dashboard__sidebar-copy">
            {partner
              ? `${partner.company} is signed in as ${partner.role}. This layout is ready for a real Spring Boot JWT backend by replacing the mock auth service with API calls and keeping the Redux session shape the same.`
              : "Use this space to monitor onboarding and integration activity."}
          </Typography>
          <Chip
            label={getStatusLabel(partner?.onboardingStatus)}
            color={partner?.onboardingStatus === "active" ? "success" : "warning"}
            variant="outlined"
            className="partner-dashboard__status-chip"
          />

          <Box className="partner-dashboard__checklist">
            {PARTNER_DASHBOARD_CONTENT.checklist.items.map((item, index) => (
              <Box key={item} className="partner-dashboard__checklist-item">
                <Box className="partner-dashboard__checklist-index">{index + 1}</Box>
                <Typography className="partner-dashboard__checklist-copy">{item}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
