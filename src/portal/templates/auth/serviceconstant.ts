export const AUTH_CONTENT = {
  shared: {
    badge: "PartnerHub Access",
    spotlightTitle: "Secure onboarding for API integrations",
    spotlightDescription:
      "Access sandbox credentials, implementation guides, and onboarding support from one trusted workspace built for ICICI Prudential partners.",
    metrics: [
      { value: "12+", label: "integration-ready APIs" },
      { value: "< 1 day", label: "onboarding response target" },
      { value: "24x7", label: "sandbox exploration" },
    ],
    highlights: [
      {
        title: "Protected partner access",
        description: "Single workspace for team credentials, testing, and implementation updates.",
      },
      {
        title: "Faster onboarding",
        description:
          "Give business teams and engineers a clean place to start their integration journey.",
      },
      {
        title: "Guided support",
        description:
          "Use the portal to move from discovery to sandbox validation with less back-and-forth.",
      },
    ],
  },
  login: {
    overline: "WELCOME BACK",
    title: "Sign in to PartnerHub",
    description:
      "Use your registered business email to continue managing API access, sandbox runs, and product documentation.",
    primaryAction: "Login",
    loadingAction: "Signing in...",
    secondaryAction: "Need help signing in?",
    secondaryHref: "/contact",
    successMessage: "Login form validated successfully. Auth API integration can plug in next.",
    switchPrompt: "New to PartnerHub?",
    switchAction: "Create an account",
    switchHref: "/signup",
    errorTitle: "Unable to sign in",
  },
  signup: {
    overline: "GET STARTED",
    title: "Create your partner account",
    description:
      "Register your team to request sandbox credentials, track onboarding status, and explore available APIs.",
    primaryAction: "Create account",
    loadingAction: "Creating account...",
    successMessage:
      "Signup request validated successfully. The next step is wiring it to the auth service.",
    switchPrompt: "Already have access?",
    switchAction: "Sign in instead",
    switchHref: "/login",
    termsLabel: "I confirm that I am authorized to request access on behalf of my organization.",
    errorTitle: "Unable to create account",
  },
};
