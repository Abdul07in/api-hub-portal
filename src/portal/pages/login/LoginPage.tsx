import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import LoginTemplate from "@/portal/templates/auth/LoginTemplate";
import {
  EMPTY_LOGIN_FORM,
  type LoginForm,
  validateLoginForm,
} from "@/portal/templates/auth/validation";
import {
  clearAuthError,
  loginPartnerThunk,
  selectAuthError,
  selectAuthStatus,
} from "@/store/slices/authSlice";
import type { AppDispatch } from "@/store";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);
  const [form, setForm] = useState<LoginForm>(EMPTY_LOGIN_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof LoginForm, string>>>({});
  const [snack, setSnack] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const nextErrors = validateLoginForm(form);
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const redirectTarget =
    typeof location.state === "object" &&
    location.state !== null &&
    "from" in location.state &&
    typeof location.state.from === "string"
      ? location.state.from
      : "/partner/dashboard";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      dispatch(clearAuthError());
      await dispatch(loginPartnerThunk(form)).unwrap();
      navigate(redirectTarget, { replace: true });
    } catch {
      setSnack(false);
    }
  };

  const setField =
    (field: keyof Pick<LoginForm, "email" | "password">) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (authError) {
        dispatch(clearAuthError());
      }
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleRememberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, rememberMe: event.target.checked }));
  };

  return (
    <LoginTemplate
      form={form}
      errors={errors}
      snack={snack}
      setSnack={setSnack}
      handleSubmit={handleSubmit}
      setField={setField}
      handleRememberChange={handleRememberChange}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      isSubmitting={authStatus === "loading"}
      authError={authError}
    />
  );
}
