import { createFileRoute } from "@tanstack/react-router";
import PageShell from "@/common/templates/pageShell/PageShell";
import SandboxPage from "@/portal/pages/sandbox/SandboxPage";

interface SandboxSearch {
  apiId?: string;
}

export const Route = createFileRoute("/sandbox")({
  validateSearch: (s: Record<string, unknown>): SandboxSearch => ({
    apiId: typeof s.apiId === "string" ? s.apiId : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sandbox — Try PartnerHub APIs" },
      {
        name: "description",
        content: "Try ICICI Pru AMC PartnerHub APIs in your browser — auto-generated forms, mock responses, no credentials.",
      },
      { property: "og:title", content: "Sandbox — Try PartnerHub APIs" },
      { property: "og:description", content: "Send requests against any PartnerHub API and inspect mocked responses." },
    ],
  }),
  component: () => (
    <PageShell maxWidth="xl">
      <SandboxPage />
    </PageShell>
  ),
});
