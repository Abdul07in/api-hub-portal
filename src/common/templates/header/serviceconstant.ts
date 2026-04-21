export interface HeaderNavItem {
  label: string;
  to: string;
}

export const HEADER_CONTENT = {
  brandTitle: "ICICI Pru PartnerHub",
  brandTagline: "APIs, sandbox and onboarding in one place",
  mobileDrawerTitle: "PartnerHub",
  mobileDrawerSubtitle: "Developer access made simple",
  secureAccessLabel: "Secure Access",
  loginLabel: "Login",
  signupLabel: "Sign Up",
  activeSectionLabel: "Current section",
};

export const HEADER_NAV: HeaderNavItem[] = [
  { label: "API Products", to: "/api-products" },
  { label: "Sandbox", to: "/sandbox" },
  { label: "FAQs", to: "/faqs" },
  { label: "Contact Us", to: "/contact" },
];
