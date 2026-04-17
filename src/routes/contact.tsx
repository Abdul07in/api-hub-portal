import { createFileRoute } from "@tanstack/react-router";
import PageShell from "@/common/templates/pageShell/PageShell";
import ContactPage from "@/portal/pages/contactUs/ContactPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — PartnerHub Developer Portal" },
      {
        name: "description",
        content: "Get in touch with the ICICI Pru AMC PartnerHub developer relations team.",
      },
      { property: "og:title", content: "Contact Us — PartnerHub Developer Portal" },
      { property: "og:description", content: "Reach out for onboarding, integration support and partnership queries." },
    ],
  }),
  component: () => (
    <PageShell>
      <ContactPage />
    </PageShell>
  ),
});
