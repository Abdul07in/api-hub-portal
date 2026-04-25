import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import HubOutlinedIcon from "@mui/icons-material/HubOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import { Link as RouterLink } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  return (
    <Box className="partner-dashboard">
      <Box className="partner-dashboard__hero">
        <Typography variant="overline" className="partner-dashboard__hero-overline">
          {PARTNER_DASHBOARD_CONTENT.hero.overline}
        </Typography>
        <Typography variant="h3" className="partner-dashboard__hero-title">
          {partner ? `Welcome back, ${partner.company}` : PARTNER_DASHBOARD_CONTENT.hero.title}
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
              {...(partner?.isSubscribed
                ? { component: RouterLink, to: PARTNER_DASHBOARD_CONTENT.actions.sandbox.href }
                : { onClick: () => setSubscribeOpen(true) })}
              variant="contained"
              color="primary"
              endIcon={!partner?.isSubscribed ? <LockOutlinedIcon /> : undefined}
              className="partner-dashboard__card-button"
            >
              {PARTNER_DASHBOARD_CONTENT.actions.sandbox.cta}
            </Button>
          </Paper>
        </Box>
      </Box>

      <Dialog open={subscribeOpen} onClose={() => setSubscribeOpen(false)}>
        <DialogTitle>Subscription Required</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To access detailed API specifications, request/response formats, and the interactive
            sandbox, you must subscribe to our API services.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubscribeOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button component={RouterLink} to="/contact" variant="contained" color="primary">
            Subscribe Now
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
