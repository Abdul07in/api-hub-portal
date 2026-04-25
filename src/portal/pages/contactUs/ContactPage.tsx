import { useState } from "react";
import ContactTemplate from "@/portal/templates/contactUs/ContactTemplate";
import { Form, EMPTY_FORM, validateContactForm } from "@/portal/templates/contactUs/validation";

export default function ContactPage() {
  const [form, setForm] = useState<Form>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [snack, setSnack] = useState(false);

  const validate = (): boolean => {
    const e = validateContactForm(form);
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSnack(true);
    setForm(EMPTY_FORM);
  };

  const setField =
    (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <ContactTemplate
      form={form}
      errors={errors}
      snack={snack}
      setSnack={setSnack}
      handleSubmit={handleSubmit}
      setField={setField}
    />
  );
}
