import { type FC } from "react";
import { Box, Chip, Paper, Typography } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

import { CONTENT } from "../serviceconstant";

const ApiProductsHero: FC = () => {
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
        <CodeIcon className="hero-banner__graphic-icon" />
      </Box>
    </Paper>
  );
};

export default ApiProductsHero;
