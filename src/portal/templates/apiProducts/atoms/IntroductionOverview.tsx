import { type FC } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import type { ApiModule } from "@/common/interfaces/api";
import { CONTENT } from "../serviceconstant";

interface IntroductionOverviewProps {
  modules: ApiModule[];
  onModuleSelect: (id: string) => void;
}

const MODULE_META: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  "check-kyc": {
    icon: <VerifiedUserIcon sx={{ fontSize: 32 }} />,
    color: "#003366",
    bg: "rgba(225, 83, 37, 0.08)",
  },
  "prospect-folio": {
    icon: <PersonAddAlt1Icon sx={{ fontSize: 32 }} />,
    color: "#003366",
    bg: "rgba(225, 83, 37, 0.08)",
  },
  "instant-redemption": {
    icon: <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 32 }} />,
    color: "#003366",
    bg: "rgba(225, 83, 37, 0.08)",
  },
};

const DEFAULT_META = {
  icon: <VerifiedUserIcon sx={{ fontSize: 32 }} />,
  color: "#003366",
  bg: "rgba(0, 51, 102, 0.08)",
};

const IntroductionOverview: FC<IntroductionOverviewProps> = ({
  modules,
  onModuleSelect,
}: IntroductionOverviewProps) => {
  const createModuleSelectHandler = (id: string) => () => onModuleSelect(id);
  return (
    <Box className="intro-overview">
      <Box className="intro-overview__header">
        <Typography variant="h4" className="intro-overview__title">
          {CONTENT.intro.title}
        </Typography>
        <Typography variant="body1" className="intro-overview__subtitle">
          {CONTENT.intro.subtitle}
        </Typography>
      </Box>

      <Grid container spacing={3} className="intro-overview__grid">
        {modules.map((module) => {
          const meta = MODULE_META[module.id] ?? DEFAULT_META;
          const apiCount = module.apis.length;
          const features = module.features?.slice(0, 3) ?? [];

          return (
            <Grid key={module.id} size={{ xs: 12, md: 4 }}>
              <Paper
                variant="outlined"
                className="intro-module-card"
                sx={{ borderColor: meta.color + "33" }}
              >
                <Stack spacing={2} className="intro-module-card__body">
                  {/* Icon + Badge row */}
                  <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box
                      className="intro-module-card__icon"
                      sx={{ bgcolor: meta.bg, color: meta.color }}
                    >
                      {meta.icon}
                    </Box>
                    <Chip
                      label={`${apiCount} ${apiCount === 1 ? CONTENT.intro.apiSingular : CONTENT.intro.apiPlural}`}
                      size="small"
                      className="intro-module-card__count"
                      sx={{
                        bgcolor: meta.bg,
                        color: meta.color,
                        fontWeight: 700,
                        fontSize: "0.7rem",
                      }}
                    />
                  </Stack>

                  {/* Name + Description */}
                  <Box>
                    <Typography
                      variant="h6"
                      className="intro-module-card__name"
                      sx={{ color: meta.color }}
                    >
                      {module.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="intro-module-card__desc"
                    >
                      {module.description}
                    </Typography>
                  </Box>

                  {/* Feature highlights */}
                  {features.length > 0 && (
                    <Stack spacing={1}>
                      {features.map((feature, idx) => (
                        <Stack
                          key={idx}
                          direction="row"
                          spacing={1}
                          sx={{ alignItems: "flex-start" }}
                        >
                          <CheckCircleOutlinedIcon
                            sx={{ fontSize: 16, color: meta.color, mt: "2px", flexShrink: 0 }}
                          />
                          <Typography variant="caption" sx={{ color: "text.secondary", lineHeight: 1.5 }}>
                            {feature}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  )}
                </Stack>

                {/* CTA */}
                <Box className="intro-module-card__footer">
                  <Button
                    fullWidth
                    variant="text"
                    endIcon={<ChevronRightIcon />}
                    onClick={createModuleSelectHandler(module.id)}
                    className="intro-module-card__cta"
                    sx={{ color: meta.color, fontWeight: 600 }}
                  >
                    {CONTENT.intro.exploreBtn}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default IntroductionOverview;
