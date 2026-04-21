import { useState } from "react";

import LoginTemplate from "@/portal/templates/auth/LoginTemplate";
import {
  EMPTY_LOGIN_FORM,
  type LoginForm,
  validateLoginForm,
} from "@/portal/templates/auth/validation";

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>(EMPTY_LOGIN_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof LoginForm, string>>>({});
  const [snack, setSnack] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const nextErrors = validateLoginForm(form);
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setSnack(true);
  };

  const setField =
    (field: keyof Pick<LoginForm, "email" | "password">) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
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
    />
  );
}
