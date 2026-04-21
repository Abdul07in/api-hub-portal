import type { ReactNode } from "react";
import { Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

import { AUTH_CONTENT } from "./serviceconstant";
import "./AuthTemplate.scss";

interface AuthShellProps {
  overline: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

const HIGHLIGHT_ICONS = [
  <ShieldOutlinedIcon color="primary" />,
  <SpeedOutlinedIcon color="secondary" />,
  <SupportAgentOutlinedIcon color="primary" />,
];

export default function AuthShell({
  overline,
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <Box className="auth-template">
      <Box className="auth-template__spotlight">
        <Chip
          label={AUTH_CONTENT.shared.badge}
          color="primary"
          variant="outlined"
          className="auth-template__spotlight-chip"
        />
        <Typography variant="h3" className="auth-template__spotlight-title">
          {AUTH_CONTENT.shared.spotlightTitle}
        </Typography>
        <Typography className="auth-template__spotlight-description">
          {AUTH_CONTENT.shared.spotlightDescription}
        </Typography>

        <Box className="auth-template__metric-grid">
          {AUTH_CONTENT.shared.metrics.map((metric) => (
            <Box key={metric.label} className="auth-template__metric-card">
              <Typography className="auth-template__metric-value">{metric.value}</Typography>
              <Typography className="auth-template__metric-label">{metric.label}</Typography>
            </Box>
          ))}
        </Box>

        <Stack spacing={2.5} className="auth-template__highlight-list">
          {AUTH_CONTENT.shared.highlights.map((item, index) => (
            <Stack key={item.title} direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
              <Box className="auth-template__highlight-icon">{HIGHLIGHT_ICONS[index]}</Box>
              <Box>
                <Typography className="auth-template__highlight-title">{item.title}</Typography>
                <Typography className="auth-template__highlight-description">
                  {item.description}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>

      <Paper variant="outlined" className="auth-template__card">
        <Box className="auth-template__card-header">
          <Typography variant="overline" className="auth-template__overline">
            {overline}
          </Typography>
          <Typography variant="h4" className="auth-template__title">
            {title}
          </Typography>
          <Typography className="auth-template__description">{description}</Typography>
        </Box>

        <Divider className="auth-template__divider" />

        {children}

        <Divider className="auth-template__divider" />

        <Box className="auth-template__footer">{footer}</Box>
      </Paper>
    </Box>
  );
}
