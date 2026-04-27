import type { RegisterOptions } from "react-hook-form";
import type { ProfileUpdateRequest } from "@/portal/services/profile";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9]{10}$/;

type ProfileFieldRules = {
  [K in keyof Pick<
    ProfileUpdateRequest,
    "fullName" | "email" | "phoneNumber" | "companyName"
  >]: RegisterOptions<ProfileUpdateRequest, K>;
};

export const PROFILE_VALIDATION_RULES: ProfileFieldRules = {
  fullName: {
    required: "Full name is required",
    minLength: { value: 2, message: "Full name must be at least 2 characters" },
    maxLength: { value: 100, message: "Full name must be at most 100 characters" },
  },
  email: {
    required: "Email address is required",
    pattern: { value: EMAIL_REGEX, message: "Enter a valid email address" },
    maxLength: { value: 255, message: "Email must not exceed 255 characters" },
  },
  phoneNumber: {
    required: "Phone number is required",
    pattern: { value: PHONE_REGEX, message: "Phone number must be 10 digits" },
  },
  companyName: {
    required: "Company name is required",
    minLength: { value: 2, message: "Company name must be at least 2 characters" },
    maxLength: { value: 200, message: "Company name must be at most 200 characters" },
  },
};
