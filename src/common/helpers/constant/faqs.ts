export interface FaqItem {
  q: string;
  a: string;
}
export interface FaqGroup {
  category: string;
  items: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
    category: "Getting Started",
    items: [
      {
        q: "What is ICICI Pru AMC PartnerHub?",
        a: "PartnerHub is the ICICI Prudential AMC developer platform exposing distribution, KYC, FATCA, tax-status and PAN-verification APIs to onboarded partners.",
      },
      {
        q: "How do I get access to the APIs?",
        a: "Reach out via the Contact Us page. Our team will share onboarding documents, NDA, and provision sandbox credentials within 2-3 business days.",
      },
      {
        q: "Is there a sandbox environment?",
        a: "Yes — the in-browser Sandbox lets you call any catalog API with mock data without provisioning credentials.",
      },
    ],
  },
  {
    category: "Authentication",
    items: [
      {
        q: "How are requests authenticated?",
        a: "All production requests require an OAuth2 Bearer token plus an x-api-key header tied to your partner account.",
      },
      {
        q: "How long is an access token valid?",
        a: "Access tokens are valid for 60 minutes. Use the refresh token issued at login to obtain a new one.",
      },
    ],
  },
  {
    category: "Modules",
    items: [
      {
        q: "Which modules are currently available?",
        a: "FATCA Details, Tax Status, KYC Verification, and NSDL PAN Verification. More modules (transactions, folio enquiry) are on the roadmap.",
      },
      {
        q: "Can I batch-verify multiple PANs?",
        a: "The current PAN verification endpoints accept a single PAN per request. A bulk endpoint is planned for Q3.",
      },
    ],
  },
  {
    category: "Sandbox",
    items: [
      {
        q: "Does the sandbox hit real systems?",
        a: "No. The Sandbox returns deterministic mock responses based on input patterns — for example a malformed PAN returns 400 while a valid PAN returns a sample success body.",
      },
      {
        q: "Can I export the sample requests?",
        a: "Yes — every request, response, and cURL snippet has a copy-to-clipboard button.",
      },
    ],
  },
  {
    category: "Errors & Limits",
    items: [
      {
        q: "What is the rate limit?",
        a: "Sandbox: 60 requests/minute. Production limits are agreed per partner contract, typically 600 requests/minute.",
      },
      {
        q: "How do I report an issue?",
        a: "Use the Contact Us form or email partnerhub.support@icicipruamc.com with the request id from the response headers.",
      },
      {
        q: "What does HTTP 401 mean?",
        a: "Your access token is missing, expired, or your x-api-key is not authorised for this endpoint.",
      },
    ],
  },
];
