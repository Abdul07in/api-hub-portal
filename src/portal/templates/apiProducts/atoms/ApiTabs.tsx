import { useState, type SyntheticEvent } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import CodeIcon from "@mui/icons-material/Code";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink } from "react-router-dom";

import CodeBlock from "@/common/atoms/codeBlock/CodeBlock";
import type { ApiSpec } from "@/common/interfaces/api";
import FieldTable from "./FieldTable";
import { CONTENT } from "../serviceconstant";
import { buildCurl } from "../utils/buildCurl";

interface ApiTabsProps {
  api: ApiSpec;
  isSubscribed: boolean;
  onTryInSandbox: (id: string) => void;
}

export default function ApiTabs({ api, isSubscribed, onTryInSandbox }: ApiTabsProps) {
  const [tab, setTab] = useState(0);
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  const handleTabChange = (_event: SyntheticEvent, nextTab: number) => {
    if (nextTab > 0 && !isSubscribed) {
      setSubscribeOpen(true);
      return;
    }

    setTab(nextTab);
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
        <Tab
          label={CONTENT.tabs.request}
          className={tab === 1 ? "api-tabs__tab--active" : ""}
          icon={!isSubscribed ? <LockOutlinedIcon fontSize="small" /> : undefined}
          iconPosition="end"
        />
        <Tab
          label={CONTENT.tabs.response}
          icon={!isSubscribed ? <LockOutlinedIcon fontSize="small" /> : undefined}
          iconPosition="end"
        />
        <Tab
          label={CONTENT.tabs.fields}
          icon={!isSubscribed ? <LockOutlinedIcon fontSize="small" /> : undefined}
          iconPosition="end"
        />
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
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1 }}>
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
                  {Object.entries(api.headers).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell sx={{ fontFamily: "monospace", color: "#1a237e" }}>
                        {key}
                      </TableCell>
                      <TableCell>{value}</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={value === "UUID" ? "OPTIONAL" : "REQUIRED"}
                          size="small"
                          color={value === "UUID" ? "default" : "error"}
                          variant="filled"
                          sx={{
                            height: 20,
                            fontSize: "0.65rem",
                            fontWeight: 600,
                            letterSpacing: 0.5,
                            borderRadius: 1,
                          }}
                          className={
                            value === "UUID" ? "req-chip-optional" : "req-chip-required"
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box>
            <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <CodeIcon fontSize="small" color="error" />
                <Typography variant="h6" className="api-tabs__section-title">
                  {CONTENT.request.sampleBody}
                </Typography>
              </Stack>
              <Button
                size="small"
                startIcon={<ContentCopyIcon />}
                sx={{ color: "#002B5C", fontWeight: 600 }}
              >
                COPY JSON
              </Button>
            </Stack>
            <Box className="code-container dark-code">
              <CodeBlock language="json" code={JSON.stringify(api.sampleRequest, null, 2)} />
            </Box>
          </Box>

          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1 }}>
              <CodeIcon fontSize="small" color="action" />
              <Typography variant="h6" className="api-tabs__section-title">
                {CONTENT.request.curlSample}
              </Typography>
            </Stack>
            <Box className="code-container dark-code">
              <CodeBlock language="bash" code={buildCurl(api)} />
            </Box>
          </Box>

          <Button
            fullWidth
            variant="contained"
            className="try-btn"
            onClick={() => onTryInSandbox(api.id)}
          >
            {CONTENT.request.tryItOut}
          </Button>
        </Stack>
      )}

      {tab === 2 && (
        <Stack spacing={2} sx={{ p: 3 }}>
          {api.responses.map((response, index) => (
            <Box key={index}>
              <Stack direction="row" spacing={1} className="api-tabs__response-row" sx={{ mb: 1 }}>
                <Chip
                  label={response.status}
                  size="small"
                  color={
                    response.status < 300
                      ? "success"
                      : response.status < 500
                        ? "warning"
                        : "error"
                  }
                />
                <Typography variant="subtitle2">{response.label}</Typography>
              </Stack>
              <Box className="code-container dark-code">
                <CodeBlock language="json" code={JSON.stringify(response.body, null, 2)} />
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
            To access detailed API specifications, request/response formats, and the interactive
            sandbox, you must subscribe to our API services.
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
