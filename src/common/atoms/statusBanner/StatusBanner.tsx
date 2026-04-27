import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import "./StatusBanner.scss";

interface StatusBannerProps {
  type: "success" | "error";
  message: string;
  visible: boolean;
  onDismiss?: () => void;
}

export default function StatusBanner({ type, message, visible, onDismiss }: StatusBannerProps) {
  return (
    <Collapse in={visible} timeout={350}>
      <Alert
        severity={type}
        className={`status-banner status-banner--${type}`}
        iconMapping={{
          success: <CheckCircleOutlinedIcon fontSize="small" />,
          error: <ErrorOutlinedIcon fontSize="small" />,
        }}
        action={
          onDismiss && (
            <IconButton
              aria-label="dismiss"
              size="small"
              onClick={onDismiss}
              className="status-banner__dismiss"
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          )
        }
      >
        {message}
      </Alert>
    </Collapse>
  );
}
