import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  Breadcrumbs,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import LaunchIcon from "@mui/icons-material/Launch";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import CodeIcon from "@mui/icons-material/Code";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

import type { ApiSpec, ApiModule } from "@/common/interfaces/api";
import MethodBadge from "@/common/atoms/methodBadge/MethodBadge";
import CodeBlock from "@/common/atoms/codeBlock/CodeBlock";
import { CONTENT } from "./serviceconstant";
import "./ApiProductsTemplate.scss";

function buildCurl(api: ApiSpec): string {
  const headers = Object.entries(api.headers)
    .map(([k, v]) => `--header '${k}: ${v}'`)
    .join(" \\\n");
  const data =
    api.method === "GET" ? "" : ` \\\n--data-raw '${JSON.stringify(api.sampleRequest, null, 2)}'`;
  return `curl --location --request ${api.method} 'https://api.icicipru.com/v2${api.path}' \\\n${headers}${data}`;
}

function ModuleOverview({ module, onApiSelect }: { module: ApiModule; onApiSelect: (id: string) => void }) {
  const [tab, setTab] = useState(0);

  return (
    <Box className="module-overview">
      <Breadcrumbs separator={<ChevronRightIcon fontSize="small" />} sx={{ mb: 2 }}>
        <Typography color="text.primary" variant="body2">Modules</Typography>
        <Typography color="text.secondary" variant="body2">{module.name}</Typography>
      </Breadcrumbs>

      <Typography variant="h4" className="module-overview__title" sx={{ mb: 1, color: '#002B5C', fontWeight: 700 }}>
        {module.name}
      </Typography>
      <Typography className="module-overview__desc" sx={{ color: 'text.secondary', mb: 3 }}>
        {module.description}
      </Typography>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} className="api-tabs__list">
        <Tab label="Features" />
        <Tab label="Flow" />
        <Tab label="API List" />
      </Tabs>

      {tab === 0 && (
        <Box sx={{ p: 2 }}>
          <Stack spacing={2}>
            {module.features?.map((f, i) => (
              <Stack direction="row" spacing={1} key={i} sx={{ alignItems: 'center' }}>
                <CheckCircleOutlinedIcon color="primary" fontSize="small" />
                <Typography>{f}</Typography>
              </Stack>
            )) || <Typography>No features defined.</Typography>}
          </Stack>
        </Box>
      )}

      {tab === 1 && (
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: '#002B5C', color: 'white', mb: 4, borderRadius: 2, textAlign: 'center', width: 200 }}>
            <SettingsSuggestIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Corporate ERP</Typography>
          </Paper>

          <Stack direction="row" spacing={2} useFlexGap sx={{ alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
            {module.flowSteps?.map((step, i) => (
              <React.Fragment key={i}>
                <Paper variant="outlined" sx={{ p: 3, width: 220, height: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderColor: '#002B5C', borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>Step {i + 1}</Typography>
                  <DescriptionOutlinedIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="subtitle1" color="#002B5C" sx={{ fontWeight: 600, mb: 1 }}>{step.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{step.desc}</Typography>
                </Paper>
                {i < (module.flowSteps?.length || 0) - 1 && (
                  <ArrowRightAltIcon color="primary" sx={{ fontSize: 40 }} />
                )}
              </React.Fragment>
            )) || <Typography>No flow steps defined.</Typography>}
          </Stack>
        </Box>
      )}

      {tab === 2 && (
        <Box sx={{ p: 2 }}>
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell sx={{ fontWeight: 700 }}>API Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Method</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Path</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {module.apis.map(api => (
                  <TableRow key={api.id} hover onClick={() => onApiSelect(api.id)} sx={{ cursor: 'pointer' }}>
                    <TableCell sx={{ fontWeight: 600, color: '#002B5C' }}>{api.name}</TableCell>
                    <TableCell><MethodBadge method={api.method} /></TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{api.path}</TableCell>
                    <TableCell align="right">
                      <Button size="small" variant="text" color="primary">View Docs</Button>
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
}

function ApiTabs({ api, onTryInSandbox, isSubscribed }: { api: ApiSpec; onTryInSandbox: (id: string) => void; isSubscribed: boolean }) {
  const [tab, setTab] = useState(1); // Default to Request tab to match image
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    if (newValue > 0 && !isSubscribed) {
      setSubscribeOpen(true);
    } else {
      setTab(newValue);
    }
  };

  return (
    <Box className="api-tabs">
      <Tabs
        value={tab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        className="api-tabs__list"
      >
        <Tab label={CONTENT.tabs.overview} />
        <Tab label={CONTENT.tabs.request} className={tab === 1 ? 'api-tabs__tab--active' : ''} icon={!isSubscribed ? <LockOutlinedIcon fontSize="small" /> : undefined} iconPosition="end" />
        <Tab label={CONTENT.tabs.response} icon={!isSubscribed ? <LockOutlinedIcon fontSize="small" /> : undefined} iconPosition="end" />
        <Tab label={CONTENT.tabs.fields} icon={!isSubscribed ? <LockOutlinedIcon fontSize="small" /> : undefined} iconPosition="end" />
      </Tabs>

      {tab === 0 && (
        <Stack spacing={1.5} sx={{ p: 3 }}>
          <Typography variant="body2" className="api-tabs__overview-desc">
            {api.description}
          </Typography>
        </Stack>
      )}

      {tab === 1 && (
        <Stack spacing={3} className="api-tabs__request-content">
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
              <DescriptionOutlinedIcon fontSize="small" color="action" />
              <Typography variant="h6" className="api-tabs__section-title">
                {CONTENT.request.headers}
              </Typography>
            </Stack>
            <TableContainer component={Paper} variant="outlined" className="field-table">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell align="right">Requirement</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(api.headers).map(([k, v]) => (
                    <TableRow key={k}>
                      <TableCell sx={{ fontFamily: 'monospace', color: '#1a237e' }}>{k}</TableCell>
                      <TableCell>{v === 'UUID' ? 'UUID' : v === 'application/json' ? 'application/json' : v}</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={v === 'UUID' ? 'OPTIONAL' : 'REQUIRED'}
                          size="small"
                          color={v === 'UUID' ? 'default' : 'error'}
                          variant="filled"
                          sx={{ height: 20, fontSize: '0.65rem', fontWeight: 600, letterSpacing: 0.5, borderRadius: 1 }}
                          className={v === 'UUID' ? 'req-chip-optional' : 'req-chip-required'}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box>
            <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <CodeIcon fontSize="small" color="error" />
                <Typography variant="h6" className="api-tabs__section-title">
                  {CONTENT.request.sampleBody}
                </Typography>
              </Stack>
              <Button size="small" startIcon={<ContentCopyIcon />} sx={{ color: '#002B5C', fontWeight: 600 }}>
                COPY JSON
              </Button>
            </Stack>
            <Box className="code-container dark-code">
              <CodeBlock language="json" code={JSON.stringify(api.sampleRequest, null, 2)} />
            </Box>
          </Box>
        </Stack>
      )}

      {tab === 2 && (
        <Stack spacing={2} sx={{ p: 3 }}>
          {api.responses.map((r, i) => (
            <Box key={i}>
              <Stack direction="row" spacing={1} className="api-tabs__response-row" sx={{ mb: 1 }}>
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
              <Box className="code-container dark-code">
                <CodeBlock language="json" code={JSON.stringify(r.body, null, 2)} />
              </Box>
            </Box>
          ))}
        </Stack>
      )}

      {tab === 3 && (
        <Stack spacing={3} sx={{ p: 3 }}>
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

      <Dialog open={subscribeOpen} onClose={() => setSubscribeOpen(false)}>
        <DialogTitle>Subscription Required</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To access detailed API specifications, request/response formats, and the interactive sandbox, you must subscribe to our API services.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubscribeOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button component={RouterLink} to="/contact" variant="contained" color="primary">
            Subscribe Now
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function FieldTable({ fields }: { fields: ApiSpec["requestFields"] }) {
  return (
    <TableContainer component={Paper} variant="outlined" className="field-table">
      <Table size="small">
        <TableHead>
          <TableRow>
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
              <TableCell sx={{ fontFamily: 'monospace' }}>{f.name}</TableCell>
              <TableCell>
                {f.type}
                {f.enumValues ? ` (${f.enumValues.join(" | ")})` : ""}
              </TableCell>
              <TableCell>{f.required ? CONTENT.fields.table.yes : CONTENT.fields.table.no}</TableCell>
              <TableCell>{f.description}</TableCell>
              <TableCell>
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
  activeApiId?: string | null;
  setActiveApiId?: (val: string | null) => void;
  activeApi?: ApiSpec | null;
  onTryInSandbox: (id: string) => void;
  isSubscribed: boolean;
}

export default function ApiProductsTemplate({
  search,
  setSearch,
  filteredModules,
  activeModuleId,
  setActiveModuleId,
  activeModule,
  activeApiId,
  setActiveApiId,
  activeApi,
  onTryInSandbox,
  isSubscribed,
}: ApiProductsTemplateProps) {

  return (
    <Box className="api-products-page">
      <Box className="api-products-page__layout">

        {/* Left Sidebar */}
        <Box className="api-products-page__sidebar">
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
            className="api-products-page__search"
            sx={{ mb: 2 }}
          />

          <Box className="api-products-page__menu">
            {filteredModules.map((m) => {
              const isModuleActive = activeModuleId === m.id;
              return (
                <Accordion
                  key={m.id}
                  disableGutters
                  elevation={0}
                  expanded={isModuleActive}
                  onChange={(_, expanded) => {
                    setActiveModuleId(m.id);
                    if (expanded && setActiveApiId) {
                      setActiveApiId(null);
                    }
                  }}
                  className="sidebar-module"
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="small" />}>
                    <Typography className={`sidebar-module__title ${isModuleActive && !activeApiId ? 'sidebar-module__title--active' : ''}`}>{m.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails className="sidebar-module__details">
                    <Stack spacing={0.5}>
                      {m.apis.map((api) => {
                        const isApiActive = activeApiId === api.id;
                        return (
                          <Button
                            key={api.id}
                            fullWidth
                            disableRipple
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveModuleId(m.id);
                              if (setActiveApiId) setActiveApiId(api.id);
                            }}
                            className={`sidebar-api ${isApiActive ? 'sidebar-api--active' : ''}`}
                            startIcon={
                              isApiActive ? (
                                <VerifiedUserIcon color="primary" fontSize="small" />
                              ) : api.id.includes('prospect') ? (
                                <PersonAddAlt1Icon color="action" fontSize="small" />
                              ) : (
                                <DescriptionOutlinedIcon color="action" fontSize="small" />
                              )
                            }
                          >
                            {api.name}
                          </Button>
                        );
                      })}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        </Box>

        {/* Main Content Area */}
        <Box className="api-products-page__main">

          {/* Hero Banner */}
          <Paper elevation={0} className="hero-banner">
            <Box className="hero-banner__content">
              <Chip label={CONTENT.hero.overline} size="small" className="hero-banner__overline" />
              <Typography variant="h3" className="hero-banner__title">
                {CONTENT.hero.title}
              </Typography>
              <Typography className="hero-banner__desc">
                {CONTENT.hero.description}
              </Typography>
            </Box>
            <Box className="hero-banner__graphic">
              <CodeIcon sx={{ fontSize: 100, color: '#1B3E7A' }} />
            </Box>
          </Paper>

          {activeModule && (
            <Box className="api-details-grid">

              {/* Center Panel: API Specs or Module Overview */}
              <Box className="api-details-main">
                {activeApi ? (
                  <>
                    <Box sx={{ mb: 3 }}>
                      <Breadcrumbs separator={<ChevronRightIcon fontSize="small" />} sx={{ mb: 2 }}>
                        <Typography color="text.primary" variant="body2" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }} onClick={() => setActiveApiId && setActiveApiId(null)}>
                          {activeModule.name}
                        </Typography>
                        <Typography color="text.secondary" variant="body2">{activeApi.name}</Typography>
                      </Breadcrumbs>
                      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', mb: 1 }}>
                        <Typography variant="h4" className="api-title">
                          {activeApi.name}
                        </Typography>
                        <Chip label="V2.4.0-STABLE" size="small" className="version-chip" />
                      </Stack>
                      <Typography className="api-desc">
                        {activeApi.description}
                      </Typography>
                    </Box>

                    <ApiTabs api={activeApi} onTryInSandbox={onTryInSandbox} isSubscribed={isSubscribed} />
                  </>
                ) : (
                  <ModuleOverview
                    module={activeModule}
                    onApiSelect={(id) => setActiveApiId && setActiveApiId(id)}
                  />
                )}
              </Box>

              {/* Right Panel: Endpoints & Try it out */}
              {activeApi && (
                <Box className="api-details-side">

                  {/* Endpoints in group */}
                  <Paper variant="outlined" className="side-card">
                    <Typography variant="subtitle2" className="side-card__title">
                      {CONTENT.request.endpointsInGroup}
                    </Typography>
                    <Stack spacing={1}>
                      {activeModule.apis.map(a => (
                        <Box
                          key={a.id}
                          className={`endpoint-row ${a.id === activeApi.id ? 'endpoint-row--active' : ''}`}
                          onClick={() => setActiveApiId && setActiveApiId(a.id)}
                        >
                          <MethodBadge method={a.method} />
                          <Typography className="endpoint-row__path">{a.path}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Paper>

                  {/* Curl Sample */}
                  <Paper variant="outlined" className="side-card dark-card">
                    <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2, px: 2, pt: 2 }}>
                      <Typography variant="subtitle2" className="side-card__title dark-title">
                        {CONTENT.request.curlSample}
                      </Typography>
                      <ContentCopyIcon fontSize="small" sx={{ color: '#fff', opacity: 0.7, cursor: 'pointer' }} />
                    </Stack>
                    <Box className="curl-code">
                      <CodeBlock language="bash" code={buildCurl(activeApi)} />
                    </Box>
                    <Box sx={{ p: 2 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        className="try-btn"
                        onClick={() => onTryInSandbox(activeApi.id)}
                      >
                        {CONTENT.request.tryItOut}
                      </Button>
                    </Box>
                  </Paper>

                  {/* Facing issues */}
                  <Paper variant="outlined" className="side-card issues-card">
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#D32F2F', mb: 1 }}>
                      {CONTENT.support.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                      {CONTENT.support.description}
                    </Typography>
                    <Stack spacing={1}>
                      <Button startIcon={<ForumOutlinedIcon />} size="small" sx={{ justifyContent: 'flex-start', color: '#002B5C' }}>
                        {CONTENT.support.channel}
                      </Button>
                      <Button startIcon={<BugReportOutlinedIcon />} size="small" sx={{ justifyContent: 'flex-start', color: '#002B5C' }}>
                        {CONTENT.support.bug}
                      </Button>
                    </Stack>
                  </Paper>

                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
