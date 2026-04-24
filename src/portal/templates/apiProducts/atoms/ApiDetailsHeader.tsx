import { Box, Breadcrumbs, Chip, Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import type { ApiModule, ApiSpec } from "@/common/interfaces/api";

interface ApiDetailsHeaderProps {
  module: ApiModule;
  api: ApiSpec;
  onBackToModule?: () => void;
}

export default function ApiDetailsHeader({
  module,
  api,
  onBackToModule,
}: ApiDetailsHeaderProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Breadcrumbs separator={<ChevronRightIcon fontSize="small" />} sx={{ mb: 2 }}>
        <Typography
          color="text.primary"
          variant="body2"
          sx={{ cursor: onBackToModule ? "pointer" : "default", "&:hover": { textDecoration: "underline" } }}
          onClick={onBackToModule}
        >
          {module.name}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {api.name}
        </Typography>
      </Breadcrumbs>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 1 }}>
        <Typography variant="h4" className="api-title">
          {api.name}
        </Typography>
        <Chip label="V2.4.0-STABLE" size="small" className="version-chip" />
      </Stack>
      <Typography className="api-desc">{api.description}</Typography>
    </Box>
  );
}
