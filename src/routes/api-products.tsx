import { createFileRoute } from "@tanstack/react-router";
import PageShell from "@/common/templates/pageShell/PageShell";
import ApiProductsPage from "@/portal/pages/apiProducts/ApiProductsPage";

export const Route = createFileRoute("/api-products")({
  head: () => ({
    meta: [
      { title: "API Products — PartnerHub Developer Portal" },
      {
        name: "description",
        content:
          "Browse the ICICI Pru AMC PartnerHub API catalog: FATCA, Tax Status, KYC Verification and NSDL PAN Verification.",
      },
      { property: "og:title", content: "API Products — PartnerHub Developer Portal" },
      {
        property: "og:description",
        content: "Inspect endpoints, request/response specifications and field details for every PartnerHub API.",
      },
    ],
  }),
  component: () => (
    <PageShell maxWidth="xl">
      <ApiProductsPage />
    </PageShell>
  ),
});
