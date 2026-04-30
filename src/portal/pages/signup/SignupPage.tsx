import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import SignupTemplate from "@/portal/templates/auth/SignupTemplate";
import { signupSchema, type SignupFormData } from "@/portal/templates/auth/validation";
import {
  clearAuthError,
  registerPartnerThunk,
  selectAuthError,
  selectAuthStatus,
} from "@/store/slices/authSlice";
import type { AppDispatch } from "@/store";

const SignupPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authStatus = useSelector(selectAuthStatus);
  const authError = useSelector(selectAuthError);
  const [snack, setSnack] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register, handleSubmit, control, formState } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      workEmail: "",
      company: "",
      role: "partner",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const onFormSubmit = async (data: SignupFormData) => {
    try {
      dispatch(clearAuthError());
      await dispatch(
        registerPartnerThunk({
          workEmail: data.workEmail,
          company: data.company,
          role: data.role,
          password: data.password,
        }),
      ).unwrap();
      setSnack(true);
      navigate("/partner/dashboard", { replace: true });
    } catch {
      // error is surfaced via authError selector from Redux
    }
  };

  return (
    <SignupTemplate
      register={register}
      control={control}
      formState={formState}
      handleSubmit={handleSubmit(onFormSubmit)}
      snack={snack}
      setSnack={setSnack}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      showConfirmPassword={showConfirmPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      isSubmitting={authStatus === "loading"}
      authError={authError}
    />
  );
};

export default SignupPage;
