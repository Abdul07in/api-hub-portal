import { type FC, type ReactNode } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import "./StatCard.scss";

export interface StatCardProps {
  title: string;
  value: string;
  indicatorIcon: ReactNode;
  indicatorLabel: string;
  indicatorVariant?: "success" | "warning";
  className?: string;
}

const StatCard: FC<StatCardProps> = ({
  title,
  value,
  indicatorIcon,
  indicatorLabel,
  indicatorVariant = "success",
  className,
}: StatCardProps) => {
  return (
    <Paper className={`stat-card ${className ?? ""}`} elevation={0}>
      <Typography className="stat-card__title">{title}</Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "baseline" }}
        className="stat-card__value-container"
      >
        <Typography variant="h4" className="stat-card__value">
          {value}
        </Typography>
        <Box className={`stat-card__indicator stat-card__indicator--${indicatorVariant}`}>
          {indicatorIcon}
          <Typography component="span" variant="body2" sx={{ fontWeight: 700 }}>
            {indicatorLabel}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default StatCard;
