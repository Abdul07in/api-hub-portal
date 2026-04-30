import { type FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import "./ConfirmModal.scss";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  open,
  title,
  message,
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={!loading ? onCancel : undefined}
      className="confirm-modal"
    >
      <DialogTitle>
        <Typography variant="h6" className="confirm-modal__title">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions className="confirm-modal__actions">
        <Button
          onClick={onCancel}
          disabled={loading}
          variant="outlined"
          color="secondary"
          className="confirm-modal__btn"
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          color="primary"
          className="confirm-modal__btn"
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
