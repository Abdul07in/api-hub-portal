import { useState } from "react";
import { Box, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export interface SecureCredentialFieldProps {
  label: string;
  value: string;
  masked?: boolean;
}

export default function SecureCredentialField({ label, value, masked = false }: SecureCredentialFieldProps) {
  const [revealed, setRevealed] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  const displayValue = masked && !revealed ? "••••••••••••••••••••••••••" : value;

  return (
    <Box sx={{ flex: 1 }}>
      <Typography className="partner-dashboard__credential-label">{label}</Typography>
      <TextField
        fullWidth
        value={displayValue}
        type={masked && !revealed ? "password" : "text"}
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            readOnly: true,
            className: "partner-dashboard__credential-input",
            endAdornment: (
              <InputAdornment position="end">
                {masked && (
                  <IconButton
                    size="small"
                    onClick={() => setRevealed(!revealed)}
                    sx={{ color: "rgba(255,255,255,0.7)", mr: 0.5 }}
                  >
                    {revealed ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                  </IconButton>
                )}
                <IconButton
                  size="small"
                  onClick={handleCopy}
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}
