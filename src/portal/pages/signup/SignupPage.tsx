import { useState } from "react";

import SignupTemplate from "@/portal/templates/auth/SignupTemplate";
import {
  EMPTY_SIGNUP_FORM,
  type SignupForm,
  validateSignupForm,
} from "@/portal/templates/auth/validation";

export default function SignupPage() {
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setSnack(true);
    setForm(EMPTY_SIGNUP_FORM);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const setField =
    (
      field: keyof Pick<
        SignupForm,
        "fullName" | "workEmail" | "company" | "role" | "password" | "confirmPassword"
      >,
    ) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
    />
  );
}
