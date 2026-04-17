import { createFileRoute } from "@tanstack/react-router";
import PageShell from "@/common/templates/pageShell/PageShell";
import FaqsPage from "@/portal/pages/faqs/FaqsPage";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — PartnerHub Developer Portal" },
      {
        name: "description",
        content: "Frequently asked questions about onboarding, authentication, modules and the PartnerHub sandbox.",
      },
      { property: "og:title", content: "FAQs — PartnerHub Developer Portal" },
      { property: "og:description", content: "Quick answers about PartnerHub API onboarding and usage." },
    ],
  }),
  component: () => (
    <PageShell>
      <FaqsPage />
    </PageShell>
  ),
});
