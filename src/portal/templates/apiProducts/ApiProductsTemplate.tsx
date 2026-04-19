import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  InputAdornment,
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
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import LaunchIcon from "@mui/icons-material/Launch";

import type { ApiSpec, ApiModule } from "@/common/interfaces/api";
import MethodBadge from "@/common/atoms/methodBadge/MethodBadge";
import CodeBlock from "@/common/atoms/codeBlock/CodeBlock";
import { CONTENT } from "./serviceconstant";
import "./ApiProductsTemplate.scss";

function buildCurl(api: ApiSpec): string {
  const headers = Object.entries(api.headers)
    .map(([k, v]) => `  -H "${k}: ${v}"`)
    .join(" \\\n");
  const data =
    api.method === "GET" ? "" : ` \\\n  -d '${JSON.stringify(api.sampleRequest, null, 2)}'`;
  return `curl -X ${api.method} https://api.icicipruamc.com${api.path} \\\n${headers}${data}`;
}

function ApiTabs({ api, onTryInSandbox }: { api: ApiSpec; onTryInSandbox: (id: string) => void }) {
  const [tab, setTab] = useState(0);
  return (
    <Box className="api-tabs">
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        className="api-tabs__list"
      >
        <Tab label={CONTENT.tabs.overview} />
        <Tab label={CONTENT.tabs.request} />
        <Tab label={CONTENT.tabs.response} />
        <Tab label={CONTENT.tabs.fields} />
      </Tabs>

      {tab === 0 && (
        <Stack spacing={1.5}>
          <Typography variant="body2" className="api-tabs__overview-desc">
            {api.description}
          </Typography>
          <Stack direction="row" spacing={1} className="api-tabs__overview-path">
            <MethodBadge method={api.method} />
            <Typography className="api-tabs__overview-path-text">{api.path}</Typography>
          </Stack>
          <Button
            onClick={() => onTryInSandbox(api.id)}
            variant="contained"
            color="primary"
            endIcon={<LaunchIcon />}
            className="api-tabs__try-btn"
          >
            {CONTENT.tryInSandbox}
          </Button>
        </Stack>
      )}

      {tab === 1 && (
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" className="api-tabs__section-title">
              {CONTENT.request.headers}
            </Typography>
            <CodeBlock
              language="http"
              code={Object.entries(api.headers)
                .map(([k, v]) => `${k}: ${v}`)
                .join("\n")}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" className="api-tabs__section-title">
              {CONTENT.request.sampleBody}
            </Typography>
            <CodeBlock language="json" code={JSON.stringify(api.sampleRequest, null, 2)} />
          </Box>
          <Box>
            <Typography variant="subtitle2" className="api-tabs__section-title">
              {CONTENT.request.curl}
            </Typography>
            <CodeBlock language="bash" code={buildCurl(api)} />
          </Box>
        </Stack>
      )}

      {tab === 2 && (
        <Stack spacing={2}>
          {api.responses.map((r, i) => (
            <Box key={i}>
              <Stack direction="row" spacing={1} className="api-tabs__response-row">
                <Chip
                  label={r.status}
                  size="small"
                  color={
                    r.status < 300
                      ? "success"
                      : r.status < 500
                        ? "warning"
                        : "error"
                  }
                />
                <Typography variant="subtitle2">{r.label}</Typography>
              </Stack>
              <CodeBlock language="json" code={JSON.stringify(r.body, null, 2)} />
            </Box>
          ))}
        </Stack>
      )}

      {tab === 3 && (
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" className="api-tabs__section-title">
              {CONTENT.fields.requestFields}
            </Typography>
            <FieldTable fields={api.requestFields} />
          </Box>
          <Box>
            <Typography variant="subtitle2" className="api-tabs__section-title">
              {CONTENT.fields.responseFields}
            </Typography>
            <FieldTable fields={api.responseFields} />
          </Box>
        </Stack>
      )}
    </Box>
  );
}

function FieldTable({ fields }: { fields: ApiSpec["requestFields"] }) {
  return (
    <TableContainer component={Paper} variant="outlined" className="field-table">
      <Table size="small" className="field-table__container">
        <TableHead>
          <TableRow className="field-table__head-row">
            <TableCell>{CONTENT.fields.table.field}</TableCell>
            <TableCell>{CONTENT.fields.table.type}</TableCell>
            <TableCell>{CONTENT.fields.table.required}</TableCell>
            <TableCell>{CONTENT.fields.table.description}</TableCell>
            <TableCell>{CONTENT.fields.table.example}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((f) => (
            <TableRow key={f.name}>
              <TableCell className="field-table__cell-field">{f.name}</TableCell>
              <TableCell>
                {f.type}
                {f.enumValues ? ` (${f.enumValues.join(" | ")})` : ""}
              </TableCell>
              <TableCell>{f.required ? CONTENT.fields.table.yes : CONTENT.fields.table.no}</TableCell>
              <TableCell className="field-table__cell-desc">{f.description}</TableCell>
              <TableCell className="field-table__cell-example">
                {f.example !== undefined ? String(f.example) : CONTENT.fields.table.empty}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export interface ApiProductsTemplateProps {
  search: string;
  setSearch: (val: string) => void;
  filteredModules: ApiModule[];
  activeModuleId: string;
  setActiveModuleId: (val: string) => void;
  activeModule: ApiModule | null;
  onTryInSandbox: (id: string) => void;
}

export default function ApiProductsTemplate({
  search,
  setSearch,
  filteredModules,
  activeModuleId,
  setActiveModuleId,
  activeModule,
  onTryInSandbox,
}: ApiProductsTemplateProps) {
  return (
    <Box className="api-products-template">
      {/* Hero */}
      <Box className="api-products-template__hero">
        <Typography variant="overline" className="api-products-template__hero-overline">
          {CONTENT.hero.overline}
        </Typography>
        <Typography variant="h3" className="api-products-template__hero-title">
          {CONTENT.hero.title}
        </Typography>
        <Typography className="api-products-template__hero-desc">
          {CONTENT.hero.description}
        </Typography>
      </Box>

      <Box className="api-products-template__grid">
        {/* Left rail */}
        <Paper variant="outlined" className="api-products-template__left-rail">
          <TextField
            fullWidth
            size="small"
            placeholder={CONTENT.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
            className="api-products-template__search"
          />
          <Stack spacing={0.5}>
            {filteredModules.map((m) => {
              const isActive = activeModule?.id === m.id;
              return (
                <Button
                  key={m.id}
                  onClick={() => setActiveModuleId(m.id)}
                  className={`api-products-template__module-btn ${
                    isActive
                      ? "api-products-template__module-btn--active"
                      : "api-products-template__module-btn--inactive"
                  }`}
                >
                  <Box>
                    <Typography className="api-products-template__module-btn-title">
                      {m.name}
                    </Typography>
                    <Typography
                      className={`api-products-template__module-btn-desc ${
                        isActive ? "api-products-template__module-btn-desc--active" : ""
                      }`}
                    >
                      {m.apis.length} {m.apis.length === 1 ? CONTENT.endpointSingular : CONTENT.endpointPlural}
                    </Typography>
                  </Box>
                </Button>
              );
            })}
          </Stack>
        </Paper>

        {/* Right pane */}
        <Box className="api-products-template__right-pane">
          {activeModule && (
            <>
              <Typography variant="h4" className="api-products-template__module-title">
                {activeModule.name}
              </Typography>
              <Typography className="api-products-template__module-desc">
                {activeModule.description}
              </Typography>

              {activeModule.apis.map((api) => (
                <Accordion key={api.id} disableGutters>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 0.5, sm: 1.5 }} className="api-products-template__accordion-summary">
                      <MethodBadge method={api.method} />
                      <Typography className="api-products-template__api-path">
                        {api.path}
                      </Typography>
                      <Typography className="api-products-template__api-name">
                        {api.name}
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ApiTabs api={api} onTryInSandbox={onTryInSandbox} />
                  </AccordionDetails>
                </Accordion>
              ))}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
