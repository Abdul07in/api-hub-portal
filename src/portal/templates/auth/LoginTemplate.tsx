import type { ChangeEvent, FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link as RouterLink } from "react-router-dom";

import AuthShell from "./AuthShell";
import { AUTH_CONTENT } from "./serviceconstant";
import type { LoginForm } from "./validation";

export interface LoginTemplateProps {
  form: LoginForm;
  errors: Partial<Record<keyof LoginForm, string>>;
  snack: boolean;
  setSnack: (value: boolean) => void;
  handleSubmit: (event: FormEvent) => void;
  setField: (
    field: keyof Pick<LoginForm, "email" | "password">,
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  handleRememberChange: (event: ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  isSubmitting: boolean;
  authError: string | null;
}

export default function LoginTemplate({
  form,
  errors,
  snack,
  setSnack,
  handleSubmit,
  setField,
  handleRememberChange,
  showPassword,
  setShowPassword,
  isSubmitting,
  authError,
}: LoginTemplateProps) {
  return (
    <>
      <AuthShell
        overline={AUTH_CONTENT.login.overline}
        title={AUTH_CONTENT.login.title}
        description={AUTH_CONTENT.login.description}
        footer={
          <Typography className="auth-template__switch-copy">
            {AUTH_CONTENT.login.switchPrompt}{" "}
            <Link component={RouterLink} to={AUTH_CONTENT.login.switchHref} underline="hover">
              {AUTH_CONTENT.login.switchAction}
            </Link>
          </Typography>
        }
      >
        <Box component="form" onSubmit={handleSubmit} noValidate className="auth-template__form">
          <Stack spacing={2.5}>
            {authError ? (
              <Alert severity="error" className="auth-template__alert">
                <strong>{AUTH_CONTENT.login.errorTitle}</strong> {authError}
              </Alert>
            ) : null}

            <TextField
              label="Business email"
              type="email"
              fullWidth
              required
              value={form.email}
              onChange={setField("email")}
              error={!!errors.email}
              helperText={errors.email}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={form.password}
              onChange={setField("password")}
              error={!!errors.password}
              helperText={errors.password}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{
                alignItems: { xs: "flex-start", sm: "center" },
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                control={<Checkbox checked={form.rememberMe} onChange={handleRememberChange} />}
                label="Keep me signed in on this device"
              />
              <Button
                component={RouterLink}
                to={AUTH_CONTENT.login.secondaryHref}
                variant="text"
                color="secondary"
                sx={{ px: 0 }}
              >
                {AUTH_CONTENT.login.secondaryAction}
              </Button>
            </Stack>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? AUTH_CONTENT.login.loadingAction : AUTH_CONTENT.login.primaryAction}
            </Button>
          </Stack>
        </Box>
      </AuthShell>

      <Snackbar
        open={snack}
        autoHideDuration={4000}
        onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSnack(false)}>
          {AUTH_CONTENT.login.successMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
