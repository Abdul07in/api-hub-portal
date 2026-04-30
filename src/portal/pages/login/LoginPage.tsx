import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import LoginTemplate from "@/portal/templates/auth/LoginTemplate";
import { loginSchema, type LoginFormData } from "@/portal/templates/auth/validation";
import {
  clearAuthError,
  loginPartnerThunk,
  selectAuthError,
  selectAuthStatus,
} from "@/store/slices/authSlice";
import type { AppDispatch } from "@/store";

const LoginPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);
  const [snack, setSnack] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, control, formState } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: true },
  });

  const redirectTarget =
    typeof location.state === "object" &&
    location.state !== null &&
    "from" in location.state &&
    typeof location.state.from === "string"
      ? location.state.from
      : "/partner/dashboard";

  const onFormSubmit = async (data: LoginFormData) => {
    try {
      dispatch(clearAuthError());
      await dispatch(loginPartnerThunk(data)).unwrap();
      navigate(redirectTarget, { replace: true });
    } catch {
      // error is surfaced via authError selector from Redux
    }
  };

  return (
    <LoginTemplate
      register={register}
      control={control}
      formState={formState}
      handleSubmit={handleSubmit(onFormSubmit)}
      snack={snack}
      setSnack={setSnack}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      isSubmitting={authStatus === "loading"}
      authError={authError}
    />
  );
};

export default LoginPage;

