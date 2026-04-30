import { useState, type FC } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import "./CodeBlock.scss";

interface CodeBlockProps {
  code: string;
  language?: string;
  maxHeight?: number | string;
}

const CodeBlock: FC<CodeBlockProps> = ({ code, language, maxHeight = 360 }) => {
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
    <Box className="code-block">
      {language && (
        <Box className="code-block__lang-label">
          {language.toUpperCase()}
        </Box>
      )}
      <Tooltip title={copied ? "Copied!" : "Copy"}>
        <IconButton
          onClick={handleCopy}
          size="small"
          className="code-block__copy-btn"
        >
          {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
      <Box
        component="pre"
        className="code-block__pre"
        style={{ maxHeight }}
      >
        {code}
      </Box>
    </Box>
  );
};

export default CodeBlock;
