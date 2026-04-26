import type { ReactNode } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";

export interface StatCardProps {
  title: string;
  value: string;
  indicatorIcon: ReactNode;
  indicatorLabel: string;
  indicatorVariant?: "success" | "warning";
  className?: string;
}

export default function StatCard({
  title,
  value,
  indicatorIcon,
  indicatorLabel,
  indicatorVariant = "success",
  className,
}: StatCardProps) {
  return (
    <Paper className={`partner-dashboard__stat-card ${className ?? ""}`} elevation={0}>
      <Typography className="partner-dashboard__stat-title">{title}</Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "baseline" }}
        className="partner-dashboard__stat-value-container"
      >
        <Typography variant="h4" className="partner-dashboard__stat-value">
          {value}
        </Typography>
        <Box
          className={`partner-dashboard__stat-indicator partner-dashboard__stat-indicator--${indicatorVariant}`}
        >
          {indicatorIcon}
          <Typography component="span" variant="body2" sx={{ fontWeight: 700 }}>
            {indicatorLabel}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
