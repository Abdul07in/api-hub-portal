import { type FC, type FormEventHandler } from "react";
import type { Control, FormState, UseFormRegister } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link as RouterLink } from "react-router-dom";

import AuthShell from "./AuthShell";
import { AUTH_CONTENT } from "./serviceconstant";
import type { SignupFormData } from "./validation";

export interface SignupTemplateProps {
  register: UseFormRegister<SignupFormData>;
  control: Control<SignupFormData>;
  formState: FormState<SignupFormData>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  snack: boolean;
  setSnack: (value: boolean) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (value: boolean) => void;
  isSubmitting: boolean;
  authError: string | null;
}

const SignupTemplate: FC<SignupTemplateProps> = ({
  register,
  control,
  formState,
  handleSubmit,
  snack,
  setSnack,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  isSubmitting,
  authError,
}: SignupTemplateProps) => {
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleCloseSnack = () => setSnack(false);
  return (
    <>
      <AuthShell
        overline={AUTH_CONTENT.signup.overline}
        title={AUTH_CONTENT.signup.title}
        description={AUTH_CONTENT.signup.description}
        footer={
          <Typography className="auth-template__switch-copy">
            {AUTH_CONTENT.signup.switchPrompt}{" "}
            <Link component={RouterLink} to={AUTH_CONTENT.signup.switchHref} underline="hover">
              {AUTH_CONTENT.signup.switchAction}
            </Link>
          </Typography>
        }
      >
        <Box component="form" onSubmit={handleSubmit} noValidate className="auth-template__form">
          <Stack spacing={2.5}>
            {authError ? (
              <Alert severity="error" className="auth-template__alert">
                <strong>{AUTH_CONTENT.signup.errorTitle}</strong> {authError}
              </Alert>
            ) : null}

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Business email"
                type="email"
                fullWidth
                required
                {...register("workEmail")}
                error={!!formState.errors.workEmail}
                helperText={formState.errors.workEmail?.message}
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
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Company name"
                fullWidth
                required
                {...register("company")}
                error={!!formState.errors.company}
                helperText={formState.errors.company?.message}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessOutlinedIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                {...register("password")}
                error={!!formState.errors.password}
                helperText={formState.errors.password?.message ?? "Use 8+ characters with letters and numbers"}
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
                          {showPassword ? (
                            <VisibilityOffOutlinedIcon />
                          ) : (
                            <VisibilityOutlinedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                label="Confirm password"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                required
                {...register("confirmPassword")}
                error={!!formState.errors.confirmPassword}
                helperText={formState.errors.confirmPassword?.message}
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
                          onClick={handleToggleConfirmPassword}
                          edge="end"
                          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOffOutlinedIcon />
                          ) : (
                            <VisibilityOutlinedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>

            <Box>
              <Controller
                name="agreeToTerms"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox checked={field.value} onChange={field.onChange} />}
                    label={AUTH_CONTENT.signup.termsLabel}
                  />
                )}
              />
              {formState.errors.agreeToTerms ? (
                <FormHelperText error>{formState.errors.agreeToTerms.message}</FormHelperText>
              ) : null}
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? AUTH_CONTENT.signup.loadingAction : AUTH_CONTENT.signup.primaryAction}
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
          {AUTH_CONTENT.signup.successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignupTemplate;
