import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutlined";
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
  rawText: string;
  setRawText: (val: string) => void;
  rawError: string | null;
  headers: Array<{ key: string; value: string }>;
  setHeaders: (val: Array<{ key: string; value: string }>) => void;
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
  rawText,
  setRawText,
  rawError,
  headers,
  setHeaders,
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

        {/* Headers + Request stacked in one grid cell */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>

        {/* Headers */}
        <Paper variant="outlined" className="sandbox-template__paper">
          <Typography className="sandbox-template__section-title">{CONTENT.headers.title}</Typography>
          <Stack spacing={1}>
            {headers.map((h, i) => (
              <Box key={i} className="sandbox-template__headers-row">
                <TextField
                  size="small"
                  placeholder={CONTENT.headers.keyPlaceholder}
                  value={h.key}
                  onChange={(e) => {
                    const next = headers.map((r, idx) => idx === i ? { ...r, key: e.target.value } : r);
                    setHeaders(next);
                  }}
                  sx={{ flex: 1 }}
                />
                <TextField
                  size="small"
                  placeholder={CONTENT.headers.valuePlaceholder}
                  value={h.value}
                  onChange={(e) => {
                    const next = headers.map((r, idx) => idx === i ? { ...r, value: e.target.value } : r);
                    setHeaders(next);
                  }}
                  sx={{ flex: 1 }}
                />
                {headers.length > 1 && (
                  <IconButton
                    size="small"
                    aria-label="remove header"
                    onClick={() => setHeaders(headers.filter((_, idx) => idx !== i))}
                  >
                    <RemoveCircleOutlineIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            ))}
          </Stack>
          <Button
            size="small"
            startIcon={<AddIcon />}
            onClick={() => setHeaders([...headers, { key: "", value: "" }])}
            className="sandbox-template__add-header-btn"
          >
            {CONTENT.headers.addBtn}
          </Button>
        </Paper>

        {/* Request builder */}
        <Paper variant="outlined" className="sandbox-template__paper">
          <Typography className="sandbox-template__section-title">{CONTENT.request.title}</Typography>

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

        </Box>{/* end Headers + Request wrapper */}

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
