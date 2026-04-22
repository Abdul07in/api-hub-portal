export const PARTNER_DASHBOARD_CONTENT = {
  hero: {
    overline: "PARTNER CONTROL CENTER",
    title: "Your onboarding and integration workspace",
    description:
      "Use the dashboard to continue onboarding, explore protected APIs, and launch sandbox testing with your partner access.",
  },
  actions: {
    apiProducts: {
      title: "Protected API Catalog",
      description:
        "Review available partner APIs, payload details, and response contracts before you integrate.",
      cta: "Open API Products",
      href: "/api-products",
    },
    sandbox: {
      title: "Sandbox Workspace",
      description:
        "Run requests with mock data, inspect payloads, and validate flows before backend go-live.",
      cta: "Open Sandbox",
      href: "/sandbox",
    },
  },
  checklist: {
    title: "Suggested next steps",
    items: [
      "Review available API modules and shortlist the flows your team needs first.",
      "Validate payload structures in Sandbox and capture the request/response contracts.",
      "Prepare Spring Boot JWT integration against the login, refresh, and profile endpoints.",
    ],
  },
  status: {
    active: "Active access",
    pending: "Pending approval",
    review: "Under review",
  },
};
