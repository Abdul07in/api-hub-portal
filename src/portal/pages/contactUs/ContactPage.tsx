import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ContactTemplate from "@/portal/templates/contactUs/ContactTemplate";
import { contactSchema, type ContactFormData } from "@/portal/templates/contactUs/validation";

const ContactPage: FC = () => {
  const [snack, setSnack] = useState(false);

  const { register, handleSubmit, reset, formState } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", company: "", subject: "", message: "" },
  });

  const onFormSubmit = (_data: ContactFormData) => {
    setSnack(true);
    reset();
  };

  return (
    <ContactTemplate
      register={register}
      formState={formState}
      handleSubmit={handleSubmit(onFormSubmit)}
      snack={snack}
      setSnack={setSnack}
    />
  );
};

export default ContactPage;
