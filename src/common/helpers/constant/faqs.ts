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
        a: "PartnerHub is the developer platform from ICICI Prudential AMC that provides fintech partners with secure access to a suite of APIs. These APIs cover distribution, KYC, FATCA, tax-status, and PAN-verification services, enabling seamless integration for onboarding, compliance, and operational workflows in the mutual fund ecosystem.",
      },

      {
        q: "How do I get access to the APIs?",
        a: "To access our APIs, please reach out via the Contact Us page. Our team will guide you through the onboarding process, which includes sharing the necessary documentation, signing a Non-Disclosure Agreement (NDA), and provisioning sandbox credentials. This process typically takes 2-3 business days, after which you can begin testing and integration.",
      },

      {
        q: "Is there a sandbox environment?",
        a: "Yes, we provide an in-browser Sandbox environment where you can interact with all catalog APIs using mock data. The Sandbox allows you to test requests and responses without needing credentials or impacting live systems, making it easy to prototype and validate your integration.",
      },
      {
        q: "What are the prerequisites for integrating with PartnerHub?",
        a: "To integrate with PartnerHub, you need to be an approved fintech partner with a valid agreement in place. Basic knowledge of REST APIs, OAuth2 authentication, and mutual fund operations is recommended. You'll also need to complete the onboarding process and receive your sandbox credentials.",
      },
      {
        q: "Is there any cost associated with API access?",
        a: "Access to the sandbox environment is free for evaluation and development. Production access may be subject to commercial agreements based on your partnership terms. Please contact our team for detailed pricing and contract information.",
      },
    ],
  },
  {
    category: "Authentication",
    items: [
      {
        q: "How are requests authenticated?",
        a: "All production API requests require two forms of authentication: an OAuth2 Bearer token, which you obtain via the login flow, and an x-api-key header that is uniquely assigned to your partner account. Both are mandatory to ensure secure and authorized access to the APIs.",
      },
      {
        q: "How long is an access token valid?",
        a: "Access tokens are valid for 60 minutes from the time of issuance. When your access token expires, you can use the refresh token (provided during login) to seamlessly obtain a new access token without re-authenticating the user.",
      },
      {
        q: "What should I do if my refresh token expires?",
        a: "If your refresh token expires or is revoked, you will need to re-authenticate using your client credentials to obtain a new set of tokens. For security, always store tokens securely and avoid sharing them.",
      },
      {
        q: "How do I rotate my x-api-key?",
        a: "To rotate your x-api-key, contact our support team via the Contact Us page. We will guide you through the process to ensure a smooth transition without service disruption.",
      },
    ],
  },
  {
    category: "Modules",
    items: [
      {
        q: "Which modules are currently available?",
        a: "Currently, the platform offers APIs for FATCA Details, Tax Status, KYC Verification, and NSDL PAN Verification. These modules help partners with regulatory compliance and investor onboarding. Additional modules, such as transaction processing and folio enquiry, are under development and will be released soon.",
      },
      {
        q: "Can I batch-verify multiple PANs?",
        a: "At present, the PAN verification endpoints support only single PAN verification per request to ensure accuracy and traceability. However, a bulk PAN verification endpoint is planned for release in Q3, which will allow you to verify multiple PANs in a single API call.",
      },
      {
        q: "How do I request access to new modules or features?",
        a: "If you need access to additional modules or upcoming features, please reach out to your account manager or use the Contact Us form. We regularly review partner requests and can enable modules based on your business requirements.",
      },
      {
        q: "Are there any sample code or SDKs available?",
        a: "Yes, we provide sample code snippets and SDKs in popular languages such as JavaScript, Python, and Java. These resources are available in the documentation section of the developer portal to help you get started quickly.",
      },
    ],
  },
  {
    category: "Sandbox",
    items: [
      {
        q: "Does the sandbox hit real systems?",
        a: "No, the Sandbox environment is completely isolated from production systems. It returns deterministic mock responses based on your input. For example, submitting a malformed PAN will return a 400 error, while a valid PAN will return a sample success response. This ensures safe and predictable testing.",
      },
      {
        q: "Can I export the sample requests?",
        a: "Yes, every API request and response in the Sandbox comes with a copy-to-clipboard button for the payload, response, and cURL command. This makes it easy to replicate requests in your own development environment.",
      },
      {
        q: "Can I reset my sandbox data?",
        a: "The sandbox environment uses mock data and is stateless, so there is no persistent data to reset. Each session is isolated, and you can rerun tests as needed without affecting previous results.",
      },
      {
        q: "Are there any limitations in the sandbox compared to production?",
        a: "Yes, the sandbox environment is designed for testing and does not connect to live systems. Some advanced features, real-time data, and production-specific modules may be unavailable or simulated in the sandbox.",
      },
    ],
  },

  {
    category: "Errors & Limits",
    items: [
      {
        q: "What is the rate limit?",
        a: "The Sandbox environment allows up to 60 requests per minute to ensure fair usage. Production rate limits are defined in your partner contract and typically allow up to 600 requests per minute. If you require higher limits, please discuss with our onboarding team.",
      },
      {
        q: "How do I report an issue?",
        a: "If you encounter any issues, please use the Contact Us form or email partnerhub.support@icicipruamc.com. Include the request id from the response headers to help us quickly trace and resolve your issue.",
      },
      {
        q: "What does HTTP 401 mean?",
        a: "An HTTP 401 error indicates that your request is unauthorized. This usually means your access token is missing, expired, or your x-api-key is invalid or not authorized for the endpoint you are trying to access. Please check your credentials and try again.",
      },
      {
        q: "What should I do if I hit the rate limit?",
        a: "If you exceed the rate limit, you will receive a 429 Too Many Requests error. Wait for the specified cooldown period before retrying. For higher limits, contact our support team to discuss your requirements.",
      },
      {
        q: "Where can I find API usage analytics or logs?",
        a: "API usage analytics and logs are available in the PartnerHub dashboard for production accounts. You can monitor request volumes, error rates, and other metrics to optimize your integration.",
      },
    ],
  },
];
