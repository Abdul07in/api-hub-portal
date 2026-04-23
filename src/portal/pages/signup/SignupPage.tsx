import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import SignupTemplate from "@/portal/templates/auth/SignupTemplate";
import {
  EMPTY_SIGNUP_FORM,
  type SignupForm,
  validateSignupForm,
} from "@/portal/templates/auth/validation";
import {
  clearAuthError,
  registerPartnerThunk,
  selectAuthError,
  selectAuthStatus,
} from "@/store/slices/authSlice";
import type { AppDispatch } from "@/store";

export default function SignupPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);
  const [form, setForm] = useState<SignupForm>(EMPTY_SIGNUP_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof SignupForm, string>>>({});
  const [snack, setSnack] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    const nextErrors = validateSignupForm(form);
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      dispatch(clearAuthError());
      await dispatch(
        registerPartnerThunk({
          fullName: form.company,
          workEmail: form.workEmail,
          company: form.company,
          role: form.role,
          password: form.password,
        }),
      ).unwrap();
      setSnack(true);
      navigate("/partner/dashboard", { replace: true });
    } catch {
      setSnack(false);
    }
  };

  const setField =
    (
      field: keyof Pick<
        SignupForm,
        "workEmail" | "company" | "password" | "confirmPassword"
      >,
    ) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (authError) {
        dispatch(clearAuthError());
      }
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, agreeToTerms: event.target.checked }));
  };

  return (
    <SignupTemplate
      form={form}
      errors={errors}
      snack={snack}
      setSnack={setSnack}
      handleSubmit={handleSubmit}
      setField={setField}
      handleTermsChange={handleTermsChange}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      showConfirmPassword={showConfirmPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      isSubmitting={authStatus === "loading"}
      authError={authError}
    />
  );
}
