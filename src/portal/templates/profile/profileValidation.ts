import { z } from "zod";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9]{10}$/;

export const profileSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be at most 100 characters"),
  email: z
    .string()
    .regex(EMAIL_REGEX, "Enter a valid email address")
    .max(255, "Email must not exceed 255 characters"),
  phoneNumber: z.string().regex(PHONE_REGEX, "Phone number must be 10 digits"),
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(200, "Company name must be at most 200 characters"),
  emailAlerts: z.boolean(),
  apiStatusUpdates: z.boolean(),
  marketingComms: z.boolean(),
});

