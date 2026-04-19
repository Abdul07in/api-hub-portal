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

import type { ApiModule, ApiSpec } from "@/common/interfaces/api";
import { FieldType } from "@/common/enums";
import MethodBadge from "@/common/atoms/methodBadge/MethodBadge";
import CodeBlock from "@/common/atoms/codeBlock/CodeBlock";
import type { SandboxResult } from "@/portal/services/sandboxRunner";
import { CONTENT } from "./serviceconstant";
import "./SandboxTemplate.scss";

export interface SandboxTemplateProps {
  apiCatalog: ApiModule[];
  moduleId: string;
  setModuleId: (val: string) => void;
  apiId: string;
  setApiId: (val: string) => void;
  currentModule: ApiModule;
  currentApi: ApiSpec;
  payload: Record<string, unknown>;
  rawMode: boolean;
  setRawMode: (val: boolean) => void;
  rawText: string;
  setRawText: (val: string) => void;
  rawError: string | null;
  loading: boolean;
  result: SandboxResult | null;
  handleField: (name: string, value: unknown) => void;
  handleSend: () => void;
}

export default function SandboxTemplate({
  apiCatalog,
  moduleId,
  setModuleId,
  apiId,
  setApiId,
  currentModule,
  currentApi,
  payload,
  rawMode,
  setRawMode,
  rawText,
  setRawText,
  rawError,
  loading,
  result,
  handleField,
  handleSend,
}: SandboxTemplateProps) {
  return (
    <Box className="sandbox-template">
      <Typography variant="overline" className="sandbox-template__hero-overline">
        {CONTENT.hero.overline}
      </Typography>
      <Typography variant="h3" className="sandbox-template__hero-title">
        {CONTENT.hero.title}
      </Typography>
      <Typography className="sandbox-template__hero-desc">
        {CONTENT.hero.description}
      </Typography>

      <Box className="sandbox-template__grid">
        {/* Picker */}
        <Paper variant="outlined" className="sandbox-template__paper">
          <Typography className="sandbox-template__section-title">{CONTENT.picker.title}</Typography>
          <FormControl fullWidth size="small" className="sandbox-template__module-select">
            <InputLabel>{CONTENT.picker.moduleLabel}</InputLabel>
            <Select
              label={CONTENT.picker.moduleLabel}
              value={moduleId}
              onChange={(e) => {
                const m = apiCatalog.find((x) => x.id === e.target.value)!;
                setModuleId(m.id);
                setApiId(m.apis[0].id);
              }}
            >
              {apiCatalog.map((m) => (
                <MenuItem key={m.id} value={m.id}>
                  {m.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel>{CONTENT.picker.apiLabel}</InputLabel>
            <Select label={CONTENT.picker.apiLabel} value={apiId} onChange={(e) => setApiId(e.target.value)}>
              {currentModule.apis.map((a) => (
                <MenuItem key={a.id} value={a.id}>
                  {a.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box className="sandbox-template__api-info-box">
            <Stack direction="row" spacing={1} className="sandbox-template__api-path-stack">
              {currentApi?.method && <MethodBadge method={currentApi.method} />}
              <Typography className="sandbox-template__api-path-text">
                {currentApi?.path}
              </Typography>
            </Stack>
            <Typography className="sandbox-template__api-desc">
              {currentApi?.description}
            </Typography>
          </Box>
        </Paper>

        {/* Request builder */}
        <Paper variant="outlined" className="sandbox-template__paper">
          <Stack direction="row" className="sandbox-template__request-header">
            <Typography className="sandbox-template__section-title">{CONTENT.request.title}</Typography>
            <FormControlLabel
              control={<Switch checked={rawMode} onChange={(_, v) => setRawMode(v)} />}
              label={<Typography variant="caption">{CONTENT.request.rawJsonToggle}</Typography>}
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
                helperText={rawError ?? CONTENT.request.rawJsonHelper}
                className="sandbox-template__raw-text-field"
              />
            </>
          ) : (
            <Stack spacing={2}>
              {currentApi?.requestFields?.map((f) => {
                const value = payload[f.name];
                if (f.type === FieldType.ENUM && f.enumValues) {
                  return (
                    <FormControl key={f.name} fullWidth size="small">
                      <InputLabel>
                        {f.name}
                        {f.required ? " *" : ""}
                      </InputLabel>
                      <Select
                        label={f.name}
                        value={value as string}
                        onChange={(e) => handleField(f.name, e.target.value)}
                      >
                        {f.enumValues.map((v) => (
                          <MenuItem key={v} value={v}>
                            {v}
                          </MenuItem>
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
                      handleField(
                        f.name,
                        f.type === FieldType.NUMBER ? Number(e.target.value) : e.target.value,
                      )
                    }
                    helperText={f.description}
                  />
                );
              })}
              {(!currentApi?.requestFields || currentApi.requestFields.length === 0) && (
                <Typography color="text.secondary" variant="body2">
                  {CONTENT.request.noBodyRequired}
                </Typography>
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
            className="sandbox-template__send-btn"
          >
            {loading ? CONTENT.request.sendingBtn : CONTENT.request.sendBtn}
          </Button>
        </Paper>

        {/* Response */}
        <Paper variant="outlined" className="sandbox-template__paper">
          <Typography className="sandbox-template__response-title">
            {CONTENT.response.title}
          </Typography>
          {!result && !loading && (
            <Alert severity="info" variant="outlined">
              <span dangerouslySetInnerHTML={{ __html: CONTENT.response.emptyAlert.replace('**Send Request**', '<strong>Send Request</strong>') }} />
            </Alert>
          )}
          {loading && (
            <Box className="sandbox-template__loading-box">
              <CircularProgress size={28} />
            </Box>
          )}
          {result && (
            <>
              <Stack direction="row" spacing={1} className="sandbox-template__result-header">
                <Chip
                  label={`HTTP ${result.status}`}
                  size="small"
                  color={
                    result.status < 300 ? "success" : result.status < 500 ? "warning" : "error"
                  }
                  className="sandbox-template__status-chip"
                />
                <Typography variant="caption" className="sandbox-template__latency-text">
                  {result.latencyMs} ms
                </Typography>
              </Stack>
              <CodeBlock
                language="json"
                code={JSON.stringify(result.body, null, 2)}
                maxHeight={520}
              />
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
