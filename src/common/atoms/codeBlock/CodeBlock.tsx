import { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
  code: string;
  language?: string;
  maxHeight?: number | string;
}

export default function CodeBlock({ code, language, maxHeight = 360 }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "#0f1b2d",
        color: "#e6edf6",
        borderRadius: 2,
        fontFamily: `"SFMono-Regular","Consolas","Liberation Mono",monospace`,
        fontSize: 13,
        lineHeight: 1.55,
        overflow: "hidden",
        border: "1px solid #1f2d44",
      }}
    >
      {language && (
        <Box sx={{ px: 2, py: 0.5, bgcolor: "#13243d", fontSize: 11, color: "#9fb0c8", letterSpacing: 1 }}>
          {language.toUpperCase()}
        </Box>
      )}
      <Tooltip title={copied ? "Copied!" : "Copy"}>
        <IconButton
          onClick={handleCopy}
          size="small"
          sx={{ position: "absolute", top: 6, right: 6, color: "#9fb0c8", "&:hover": { color: "#fff" } }}
        >
          {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
      <Box component="pre" sx={{ m: 0, p: 2, maxHeight, overflow: "auto", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        {code}
      </Box>
    </Box>
  );
}
