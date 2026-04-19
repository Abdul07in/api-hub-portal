export interface Form {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

export const EMPTY_FORM: Form = { name: "", email: "", company: "", subject: "", message: "" };

export const validateContactForm = (form: Form): Partial<Record<keyof Form, string>> => {
  const e: Partial<Record<keyof Form, string>> = {};
  if (!form.name.trim()) e.name = "Required";
  if (!form.email.trim()) e.email = "Required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
  if (!form.subject.trim()) e.subject = "Required";
  if (!form.message.trim() || form.message.trim().length < 10)
    e.message = "Please provide at least 10 characters";
  return e;
};
