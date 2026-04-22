export interface HeaderNavItem {
  label: string;
  to: string;
  authRequired?: boolean;
}

export const HEADER_CONTENT = {
  brandTitle: "ICICI Pru PartnerHub",
  brandTagline: "APIs, sandbox and onboarding in one place",
  mobileDrawerTitle: "PartnerHub",
  mobileDrawerSubtitle: "Developer access made simple",
  secureAccessLabel: "Secure Access",
  loginLabel: "Login",
  signupLabel: "Sign Up",
  dashboardLabel: "Dashboard",
  logoutLabel: "Logout",
  activeSectionLabel: "Current section",
  guestDrawerTitle: "PartnerHub",
  authenticatedDrawerTitle: "Partner Workspace",
};

export const HEADER_NAV: HeaderNavItem[] = [
  { label: "Dashboard", to: "/partner/dashboard", authRequired: true },
  { label: "API Products", to: "/api-products", authRequired: true },
  { label: "Sandbox", to: "/sandbox", authRequired: true },
  { label: "FAQs", to: "/faqs" },
  { label: "Contact Us", to: "/contact" },
];
