import { Box, Chip, Paper, Typography } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

import { CONTENT } from "../serviceconstant";

export default function ApiProductsHero() {
  return (
    <Paper elevation={0} className="hero-banner">
      <Box className="hero-banner__content">
        <Chip label={CONTENT.hero.overline} size="small" className="hero-banner__overline" />
        <Typography variant="h3" className="hero-banner__title">
          {CONTENT.hero.title}
        </Typography>
        <Typography className="hero-banner__desc">{CONTENT.hero.description}</Typography>
      </Box>
      <Box className="hero-banner__graphic">
        <CodeIcon sx={{ fontSize: 100, color: "#1B3E7A" }} />
      </Box>
    </Paper>
  );
}
