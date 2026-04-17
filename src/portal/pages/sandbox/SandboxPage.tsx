import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useSearch, useNavigate } from "@tanstack/react-router";

import { apiCatalog, findApiById } from "@/common/helpers/constant/apiCatalog";
import type { ApiSpec } from "@/common/interfaces/api";
import { FieldType } from "@/common/enums";
import MethodBadge from "@/common/atoms/methodBadge/MethodBadge";
import CodeBlock from "@/common/atoms/codeBlock/CodeBlock";
import { runSandbox, type SandboxResult } from "@/portal/services/sandboxRunner";

function defaultPayload(api: ApiSpec): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of api.requestFields) {
    if (f.example !== undefined) out[f.name] = f.example;
    else if (f.type === FieldType.BOOLEAN) out[f.name] = false;
    else if (f.type === FieldType.NUMBER) out[f.name] = 0;
    else out[f.name] = "";
  }
  return out;
}

export default function SandboxPage() {
  const search = useSearch({ from: "/sandbox" }) as { apiId?: string };
  const navigate = useNavigate();
  const initial = (search.apiId && findApiById(search.apiId)) || {
    module: apiCatalog[0],
    api: apiCatalog[0].apis[0],
  };

  const [moduleId, setModuleId] = useState(initial.module.id);
  const [apiId, setApiId] = useState(initial.api.id);
  const [payload, setPayload] = useState<Record<string, unknown>>(() => defaultPayload(initial.api));
  const [rawMode, setRawMode] = useState(false);
  const [rawText, setRawText] = useState(() => JSON.stringify(defaultPayload(initial.api), null, 2));
  const [rawError, setRawError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SandboxResult | null>(null);

  const currentModule = useMemo(() => apiCatalog.find((m) => m.id === moduleId)!, [moduleId]);
  const currentApi = useMemo(
    () => currentModule.apis.find((a) => a.id === apiId) ?? currentModule.apis[0],
    [currentModule, apiId],
  );

  // When the API changes, reset payload + URL
  useEffect(() => {
    const fresh = defaultPayload(currentApi);
    setPayload(fresh);
    setRawText(JSON.stringify(fresh, null, 2));
    setRawError(null);
    setResult(null);
    if (search.apiId !== currentApi.id) {
      navigate({ to: "/sandbox", search: { apiId: currentApi.id }, replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentApi.id]);

  const handleField = (name: string, value: unknown) => {
    setPayload((p) => {
      const next = { ...p, [name]: value };
      setRawText(JSON.stringify(next, null, 2));
      return next;
    });
  };

  const handleSend = async () => {
    let body = payload;
    if (rawMode) {
      try {
        body = JSON.parse(rawText);
        setRawError(null);
      } catch (e) {
        setRawError((e as Error).message);
        return;
      }
    }
    setLoading(true);
    setResult(null);
    const res = await runSandbox(currentApi, body as Record<string, unknown>);
    setResult(res);
    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="overline" sx={{ color: "primary.main", letterSpacing: 2 }}>SANDBOX</Typography>
      <Typography variant="h3" sx={{ color: "secondary.main", fontWeight: 800, mt: 1 }}>
        Try our APIs
      </Typography>
      <Typography sx={{ mt: 1, mb: 4, color: "text.secondary", maxWidth: 720 }}>
        Pick an endpoint, fill the request, and inspect the mocked response. No credentials required —
        responses are deterministic mocks generated from the field specifications.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gap: 2.5,
          gridTemplateColumns: { xs: "1fr", md: "260px 1fr 1fr" },
          alignItems: "start",
        }}
      >
        {/* Picker */}
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: 700, mb: 1, color: "secondary.main" }}>Endpoint</Typography>
          <FormControl fullWidth size="small" sx={{ mb: 1.5 }}>
            <InputLabel>Module</InputLabel>
            <Select
              label="Module"
              value={moduleId}
              onChange={(e) => {
                const m = apiCatalog.find((x) => x.id === e.target.value)!;
                setModuleId(m.id);
                setApiId(m.apis[0].id);
              }}
            >
              {apiCatalog.map((m) => (
                <MenuItem key={m.id} value={m.id}>{m.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel>API</InputLabel>
            <Select label="API" value={apiId} onChange={(e) => setApiId(e.target.value)}>
              {currentModule.apis.map((a) => (
                <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ mt: 2, p: 1.5, bgcolor: "background.default", borderRadius: 1.5, border: 1, borderColor: "divider" }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <MethodBadge method={currentApi.method} />
              <Typography sx={{ fontFamily: "monospace", fontSize: 12, wordBreak: "break-all" }}>
                {currentApi.path}
              </Typography>
            </Stack>
            <Typography sx={{ mt: 1, fontSize: 12, color: "text.secondary" }}>
              {currentApi.description}
            </Typography>
          </Box>
        </Paper>

        {/* Request builder */}
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Stack direction="row" sx={{ mb: 1.5, alignItems: "center", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: 700, color: "secondary.main" }}>Request</Typography>
            <FormControlLabel
              control={<Switch checked={rawMode} onChange={(_, v) => setRawMode(v)} />}
              label={<Typography variant="caption">Raw JSON</Typography>}
            />
          </Stack>

          {rawMode ? (
            <>
              <TextField
                fullWidth
                multiline
                minRows={10}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                error={!!rawError}
                helperText={rawError ?? "Edit the JSON payload directly."}
                sx={{ "& textarea": { fontFamily: "monospace", fontSize: 13 } }}
              />
            </>
          ) : (
            <Stack spacing={2}>
              {currentApi.requestFields.map((f) => {
                const value = payload[f.name];
                if (f.type === FieldType.ENUM && f.enumValues) {
                  return (
                    <FormControl key={f.name} fullWidth size="small">
                      <InputLabel>{f.name}{f.required ? " *" : ""}</InputLabel>
                      <Select
                        label={f.name}
                        value={value as string}
                        onChange={(e) => handleField(f.name, e.target.value)}
                      >
                        {f.enumValues.map((v) => (
                          <MenuItem key={v} value={v}>{v}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  );
                }
                if (f.type === FieldType.BOOLEAN) {
                  return (
                    <ToggleButtonGroup
                      key={f.name}
                      exclusive
                      size="small"
                      value={String(value)}
                      onChange={(_, v) => v !== null && handleField(f.name, v === "true")}
                    >
                      <ToggleButton value="true">{f.name}: true</ToggleButton>
                      <ToggleButton value="false">{f.name}: false</ToggleButton>
                    </ToggleButtonGroup>
                  );
                }
                return (
                  <TextField
                    key={f.name}
                    label={`${f.name}${f.required ? " *" : ""}`}
                    fullWidth
                    size="small"
                    type={f.type === FieldType.NUMBER ? "number" : "text"}
                    value={value ?? ""}
                    onChange={(e) =>
                      handleField(f.name, f.type === FieldType.NUMBER ? Number(e.target.value) : e.target.value)
                    }
                    helperText={f.description}
                  />
                );
              })}
              {currentApi.requestFields.length === 0 && (
                <Typography color="text.secondary" variant="body2">No request body required.</Typography>
              )}
            </Stack>
          )}

          <Button
            onClick={handleSend}
            variant="contained"
            color="primary"
            size="large"
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
            disabled={loading}
            sx={{ mt: 2.5 }}
          >
            {loading ? "Sending..." : "Send Request"}
          </Button>
        </Paper>

        {/* Response */}
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: 700, mb: 1.5, color: "secondary.main" }}>Response</Typography>
          {!result && !loading && (
            <Alert severity="info" variant="outlined">
              Hit <strong>Send Request</strong> to view the mocked response.
            </Alert>
          )}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
              <CircularProgress size={28} />
            </Box>
          )}
          {result && (
            <>
              <Stack direction="row" spacing={1} sx={{ mb: 1.5, alignItems: "center" }}>
                <Chip
                  label={`HTTP ${result.status}`}
                  size="small"
                  color={result.status < 300 ? "success" : result.status < 500 ? "warning" : "error"}
                  sx={{ fontWeight: 700 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {result.latencyMs} ms
                </Typography>
              </Stack>
              <CodeBlock language="json" code={JSON.stringify(result.body, null, 2)} maxHeight={520} />
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
