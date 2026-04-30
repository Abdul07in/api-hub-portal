import { useState, type FC } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import type { ApiModule } from "@/common/interfaces/api";
import MethodBadge from "@/common/atoms/methodBadge/MethodBadge";
import FlowAnimation from "./FlowAnimation";

interface ModuleOverviewProps {
  module: ApiModule;
  onApiSelect: (id: string) => void;
}

const ModuleOverview: FC<ModuleOverviewProps> = ({ module, onApiSelect }) => {
  const [tab, setTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, nextTab: number) => setTab(nextTab);
  const createApiSelectHandler = (id: string) => () => onApiSelect(id);

  return (
    <Box className="module-overview">
      <Breadcrumbs separator={<ChevronRightIcon fontSize="small" />} sx={{ mb: 2 }}>
        <Typography color="text.primary" variant="body2">
          Modules
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {module.name}
        </Typography>
      </Breadcrumbs>

      <Typography
        variant="h4"
        className="module-overview__title module-overview__title--colored"
      >
        {module.name}
      </Typography>
      <Typography className="module-overview__desc" sx={{ color: "text.secondary", mb: 3 }}>
        {module.description}
      </Typography>

      <Tabs value={tab} onChange={handleTabChange} className="api-tabs__list">
        <Tab label="Features" />
        <Tab label="Flow" />
        <Tab label="API List" />
      </Tabs>

      {tab === 0 && (
        <Box sx={{ p: 2 }}>
          <Stack spacing={2}>
            {module.features?.map((feature, index) => (
              <Stack direction="row" spacing={1} key={index} sx={{ alignItems: "center" }}>
                <CheckCircleOutlinedIcon color="primary" fontSize="small" />
                <Typography>{feature}</Typography>
              </Stack>
            )) ?? <Typography>No features defined.</Typography>}
          </Stack>
        </Box>
      )}

      {tab === 1 && <FlowAnimation flowSteps={module.flowSteps} />}

      {tab === 2 && (
        <Box sx={{ p: 2 }}>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "transparent" }} className="module-overview__table-header">
                  <TableCell sx={{ fontWeight: 700 }}>API Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Method</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Path</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {module.apis.map((api) => (
                  <TableRow
                    key={api.id}
                    hover
                    onClick={createApiSelectHandler(api.id)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell className="module-overview__api-name">{api.name}</TableCell>
                    <TableCell>
                      <MethodBadge method={api.method} />
                    </TableCell>
                    <TableCell sx={{ fontFamily: "monospace", color: "text.secondary" }}>
                      {api.path}
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" variant="text" color="primary">
                        View Docs
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default ModuleOverview;
