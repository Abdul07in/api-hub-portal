import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().min(1, "Required").email("Invalid email"),
  company: z.string(),
  subject: z.string().min(1, "Required"),
  message: z.string().min(10, "Please provide at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
