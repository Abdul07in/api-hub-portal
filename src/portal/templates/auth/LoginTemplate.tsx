import { type FC, type FormEventHandler } from "react";
import type { Control, FormState, UseFormRegister } from "react-hook-form";
import { Controller } from "react-hook-form";
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
import type { LoginFormData } from "./validation";

export interface LoginTemplateProps {
  register: UseFormRegister<LoginFormData>;
  control: Control<LoginFormData>;
  formState: FormState<LoginFormData>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  snack: boolean;
  setSnack: (value: boolean) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  isSubmitting: boolean;
  authError: string | null;
}

const LoginTemplate: FC<LoginTemplateProps> = ({
  register,
  control,
  formState,
  handleSubmit,
  snack,
  setSnack,
  showPassword,
  setShowPassword,
  isSubmitting,
  authError,
}: LoginTemplateProps) => {
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleCloseSnack = () => setSnack(false);
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
              {...register("email")}
              error={!!formState.errors.email}
              helperText={formState.errors.email?.message}
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
              {...register("password")}
              error={!!formState.errors.password}
              helperText={formState.errors.password?.message}
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
                        onClick={handleTogglePassword}
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
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox checked={field.value} onChange={field.onChange} />}
                    label="Keep me signed in on this device"
                  />
                )}
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
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled" onClose={handleCloseSnack}>
          {AUTH_CONTENT.login.successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginTemplate;
