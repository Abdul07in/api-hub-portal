import type { ChangeEvent, FormEvent } from "react";
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
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { Link as RouterLink } from "react-router-dom";

import AuthShell from "./AuthShell";
import { AUTH_CONTENT } from "./serviceconstant";
import type { SignupForm } from "./validation";

export interface SignupTemplateProps {
  form: SignupForm;
  errors: Partial<Record<keyof SignupForm, string>>;
  snack: boolean;
  setSnack: (value: boolean) => void;
  handleSubmit: (event: FormEvent) => void;
  setField: (
    field: keyof Pick<
      SignupForm,
      "fullName" | "workEmail" | "company" | "role" | "password" | "confirmPassword"
    >,
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  handleTermsChange: (event: ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (value: boolean) => void;
}

export default function SignupTemplate({
  form,
  errors,
  snack,
  setSnack,
  handleSubmit,
  setField,
  handleTermsChange,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}: SignupTemplateProps) {
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
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Full name"
                fullWidth
                required
                value={form.fullName}
                onChange={setField("fullName")}
                error={!!errors.fullName}
                helperText={errors.fullName}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeOutlinedIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                label="Business email"
                type="email"
                fullWidth
                required
                value={form.workEmail}
                onChange={setField("workEmail")}
                error={!!errors.workEmail}
                helperText={errors.workEmail}
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
                value={form.company}
                onChange={setField("company")}
                error={!!errors.company}
                helperText={errors.company}
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

              <TextField
                label="Role or team"
                fullWidth
                required
                value={form.role}
                onChange={setField("role")}
                error={!!errors.role}
                helperText={errors.role}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <WorkOutlineOutlinedIcon fontSize="small" color="action" />
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
                value={form.password}
                onChange={setField("password")}
                error={!!errors.password}
                helperText={errors.password ?? "Use 8+ characters with letters and numbers"}
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
                value={form.confirmPassword}
                onChange={setField("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
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
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
              <FormControlLabel
                control={<Checkbox checked={form.agreeToTerms} onChange={handleTermsChange} />}
                label={AUTH_CONTENT.signup.termsLabel}
              />
              {errors.agreeToTerms ? (
                <FormHelperText error>{errors.agreeToTerms}</FormHelperText>
              ) : null}
            </Box>

            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              {AUTH_CONTENT.signup.primaryAction}
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
          {AUTH_CONTENT.signup.successMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
