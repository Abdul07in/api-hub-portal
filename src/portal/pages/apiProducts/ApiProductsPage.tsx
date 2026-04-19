import { useMemo, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectModules } from "@/store/slices/apiCatalogSlice";
import type { ApiSpec } from "@/common/interfaces/api";
import MethodBadge from "@/common/atoms/methodBadge/MethodBadge";
import CodeBlock from "@/common/atoms/codeBlock/CodeBlock";

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
    <Box sx={{ mt: 2, width: "100%", overflow: "hidden" }}>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        sx={{ borderBottom: 1, borderColor: "divider", mb: 2, width: "100%" }}
      >
        <Tab label="Overview" />
        <Tab label="Request" />
        <Tab label="Response" />
        <Tab label="Field Specifications" />
      </Tabs>

      {tab === 0 && (
        <Stack spacing={1.5}>
          <Typography variant="body2" color="text.secondary">
            {api.description}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <MethodBadge method={api.method} />
            <Typography sx={{ fontFamily: "monospace", fontSize: 14 }}>{api.path}</Typography>
          </Stack>
          <Button
            onClick={() => onTryInSandbox(api.id)}
            variant="contained"
            color="primary"
            endIcon={<LaunchIcon />}
            sx={{ alignSelf: "flex-start", mt: 1 }}
          >
            Try in Sandbox
          </Button>
        </Stack>
      )}

      {tab === 1 && (
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Headers
            </Typography>
            <CodeBlock
              language="http"
              code={Object.entries(api.headers)
                .map(([k, v]) => `${k}: ${v}`)
                .join("\n")}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Sample Request Body
            </Typography>
            <CodeBlock language="json" code={JSON.stringify(api.sampleRequest, null, 2)} />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              cURL
            </Typography>
            <CodeBlock language="bash" code={buildCurl(api)} />
          </Box>
        </Stack>
      )}

      {tab === 2 && (
        <Stack spacing={2}>
          {api.responses.map((r, i) => (
            <Box key={i}>
              <Stack direction="row" spacing={1} sx={{ mb: 1, alignItems: "center" }}>
                <Chip
                  label={r.status}
                  size="small"
                  sx={{
                    bgcolor:
                      r.status < 300
                        ? "success.light"
                        : r.status < 500
                          ? "warning.light"
                          : "error.light",
                    color: "#fff",
                    fontWeight: 700,
                  }}
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
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Request Fields
            </Typography>
            <FieldTable fields={api.requestFields} />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Response Fields
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
    <TableContainer component={Paper} variant="outlined" sx={{ overflowX: "auto", width: "100%" }}>
      <Table size="small" sx={{ minWidth: 600 }}>
        <TableHead>
          <TableRow sx={{ "& th": { fontWeight: 700, bgcolor: "background.default" } }}>
            <TableCell>Field</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Required</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Example</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((f) => (
            <TableRow key={f.name}>
              <TableCell sx={{ fontFamily: "monospace", fontWeight: 600 }}>{f.name}</TableCell>
              <TableCell>
                {f.type}
                {f.enumValues ? ` (${f.enumValues.join(" | ")})` : ""}
              </TableCell>
              <TableCell>{f.required ? "Yes" : "No"}</TableCell>
              <TableCell sx={{ color: "text.secondary" }}>{f.description}</TableCell>
              <TableCell sx={{ fontFamily: "monospace", color: "text.secondary" }}>
                {f.example !== undefined ? String(f.example) : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function ApiProductsPage() {
  const navigate = useNavigate();
  const apiCatalog = useSelector(selectModules);
  const [activeModuleId, setActiveModuleId] = useState(apiCatalog[0]?.id || "");
  const [search, setSearch] = useState("");

  const handleTry = (apiId: string) => {
    navigate(`/sandbox?apiId=${apiId}`);
  };

  const filteredModules = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return apiCatalog;
    return apiCatalog
      .map((m) => ({
        ...m,
        apis: m.apis.filter(
          (a) =>
            a.name.toLowerCase().includes(q) ||
            a.path.toLowerCase().includes(q) ||
            m.name.toLowerCase().includes(q),
        ),
      }))
      .filter((m) => m.apis.length > 0 || m.name.toLowerCase().includes(q));
  }, [search]);

  const activeModule =
    filteredModules.find((m) => m.id === activeModuleId) ??
    filteredModules[0] ??
    apiCatalog[0] ??
    null;

  return (
    <Box>
      {/* Hero */}
      <Box
        sx={{
          mb: 4,
          p: { xs: 2.5, md: 5 },
          borderRadius: 3,
          background: "linear-gradient(135deg, #155686 0%, #1f6fa8 100%)",
          color: "#fff",
        }}
      >
        <Typography variant="overline" sx={{ color: "#ffd2c2", letterSpacing: 2, fontSize: { xs: 10, sm: 12 } }}>
          API CATALOG
        </Typography>
        <Typography variant="h3" sx={{ mt: 1, fontWeight: 800, fontSize: { xs: "1.75rem", md: "3rem" } }}>
          Build with PartnerHub APIs
        </Typography>
        <Typography sx={{ mt: 1.5, maxWidth: 720, opacity: 0.92, fontSize: { xs: 14, md: 16 } }}>
          Browse our developer-ready APIs across KYC, FATCA, Tax Status and PAN verification.
          Inspect request and response specifications, then try every endpoint in the in-browser
          Sandbox.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", md: "300px 1fr" },
          alignItems: "start",
        }}
      >
        {/* Left rail */}
        <Paper variant="outlined" sx={{ p: 2, position: { md: "sticky" }, top: { md: 88 } }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search modules / APIs"
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
            sx={{ mb: 2 }}
          />
          <Stack spacing={0.5}>
            {filteredModules.map((m) => (
              <Button
                key={m.id}
                onClick={() => setActiveModuleId(m.id)}
                sx={{
                  justifyContent: "flex-start",
                  textAlign: "left",
                  px: 1.5,
                  py: 1.25,
                  borderRadius: 1.5,
                  bgcolor: activeModule.id === m.id ? "primary.main" : "transparent",
                  color: activeModule.id === m.id ? "#fff" : "text.primary",
                  "&:hover": {
                    bgcolor: activeModule.id === m.id ? "primary.dark" : "rgba(225,83,37,0.08)",
                  },
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 14 }}>{m.name}</Typography>
                  <Typography
                    sx={{
                      fontSize: 11,
                      opacity: 0.8,
                      color: activeModule.id === m.id ? "#fff" : "text.secondary",
                    }}
                  >
                    {m.apis.length} {m.apis.length === 1 ? "endpoint" : "endpoints"}
                  </Typography>
                </Box>
              </Button>
            ))}
          </Stack>
        </Paper>

        {/* Right pane */}
        <Box sx={{ minWidth: 0, width: "100%" }}>
          {activeModule && (
            <>
              <Typography variant="h4" sx={{ color: "secondary.main" }}>
                {activeModule.name}
              </Typography>
              <Typography sx={{ mt: 1, mb: 3, color: "text.secondary" }}>
                {activeModule.description}
              </Typography>

              {activeModule.apis.map((api) => (
                <Accordion key={api.id} disableGutters>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={{ xs: 0.5, sm: 1.5 }}
                      sx={{ flex: 1, minWidth: 0, alignItems: { xs: "flex-start", sm: "center" } }}
                    >
                      <MethodBadge method={api.method} />
                      <Typography
                        sx={{
                          fontFamily: "monospace",
                          fontWeight: 600,
                          color: "secondary.main",
                          fontSize: { xs: 12, sm: 14 },
                          wordBreak: "break-all",
                        }}
                      >
                        {api.path}
                      </Typography>
                      <Typography
                        sx={{
                          color: "text.secondary",
                          fontSize: 13,
                          ml: "auto",
                          display: { xs: "none", sm: "block" },
                        }}
                      >
                        {api.name}
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ApiTabs api={api} onTryInSandbox={handleTry} />
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
