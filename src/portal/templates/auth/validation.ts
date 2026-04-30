import { z } from "zod";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STRONG_PW_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Business email is required")
    .regex(EMAIL_REGEX, "Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

export const signupSchema = z
  .object({
    workEmail: z
      .string()
      .min(1, "Business email is required")
      .regex(EMAIL_REGEX, "Enter a valid email address"),
    company: z.string().min(1, "Company name is required"),
    role: z.string(),
    password: z
      .string()
      .min(1, "Password is required")
      .regex(STRONG_PW_REGEX, "Use at least 8 characters with letters and numbers"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeToTerms: z
      .boolean()
      .refine((val) => val, { message: "You must accept the portal terms to continue" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
