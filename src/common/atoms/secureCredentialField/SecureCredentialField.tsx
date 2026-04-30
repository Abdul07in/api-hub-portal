import { useState, type FC } from "react";
import { Box, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./SecureCredentialField.scss";

export interface SecureCredentialFieldProps {
  label: string;
  value: string;
  masked?: boolean;
}

const SecureCredentialField: FC<SecureCredentialFieldProps> = ({
  label,
  value,
  masked = false,
}) => {
  const [revealed, setRevealed] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  const handleToggleRevealed = () => setRevealed((prev) => !prev);

  const displayValue = masked && !revealed ? "••••••••••••••••••••••••••" : value;

  return (
    <Box className="secure-credential-field">
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
                    onClick={handleToggleRevealed}
                    className="secure-credential-field__icon-btn secure-credential-field__icon-btn--spaced"
                  >
                    {revealed ? (
                      <VisibilityOffIcon fontSize="small" />
                    ) : (
                      <VisibilityIcon fontSize="small" />
                    )}
                  </IconButton>
                )}
                <IconButton
                  size="small"
                  onClick={handleCopy}
                  className="secure-credential-field__icon-btn"
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
};

export default SecureCredentialField;
