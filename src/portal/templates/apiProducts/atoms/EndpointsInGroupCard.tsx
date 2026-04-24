import { Box, Paper, Stack, Typography } from "@mui/material";

import type { ApiModule, ApiSpec } from "@/common/interfaces/api";
import MethodBadge from "@/common/atoms/methodBadge/MethodBadge";
import { CONTENT } from "../serviceconstant";

interface EndpointsInGroupCardProps {
  module: ApiModule;
  activeApi: ApiSpec;
  onSelectApi?: (id: string) => void;
}

export default function EndpointsInGroupCard({
  module,
  activeApi,
  onSelectApi,
}: EndpointsInGroupCardProps) {
  return (
    <Paper variant="outlined" className="side-card">
      <Typography variant="subtitle2" className="side-card__title">
        {CONTENT.request.endpointsInGroup}
      </Typography>
      <Stack spacing={1}>
        {module.apis.map((api) => (
          <Box
            key={api.id}
            className={`endpoint-row ${api.id === activeApi.id ? "endpoint-row--active" : ""}`}
            onClick={() => onSelectApi?.(api.id)}
          >
            <MethodBadge method={api.method} />
            <Typography className="endpoint-row__path">{api.path}</Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
