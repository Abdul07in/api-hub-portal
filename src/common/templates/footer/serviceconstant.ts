export interface FooterLinkItem {
  label: string;
  to?: string;
  href?: string;
  authRequired?: boolean;
  guestOnly?: boolean;
}

export interface FooterSocialItem {
  label: string;
  href: string;
}

export const FOOTER_CONTENT = {
  brandTitle: "ICICI Pru AMC · PartnerHub",
  brandDescription:
    "The developer portal for our distribution partners. Build, test and integrate with our APIs in minutes.",
  exploreTitle: "Explore",
  resourcesTitle: "Resources",
  connectTitle: "Connect",
  supportEmail: "partnerhub.support@icicipruamc.com",
};

export const FOOTER_EXPLORE_LINKS: FooterLinkItem[] = [
  { label: "Dashboard", to: "/partner/dashboard", authRequired: true },
  { label: "API Products", to: "/api-products", authRequired: true },
  { label: "Sandbox", to: "/sandbox", authRequired: true },
  { label: "FAQs", to: "/faqs" },
  { label: "Contact Us", to: "/contact" },
  { label: "Login", to: "/login", guestOnly: true },
  { label: "Sign Up", to: "/signup", guestOnly: true },
];

export const FOOTER_RESOURCE_LINKS: FooterLinkItem[] = [
  { label: "Authentication Guide", href: "#" },
  { label: "Status Page", href: "#" },
  { label: "Changelog", href: "#" },
  { label: "SLA", href: "#" },
];

export const FOOTER_LEGAL_LINKS: FooterLinkItem[] = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Disclaimer", href: "#" },
];

export const FOOTER_SOCIAL_LINKS: FooterSocialItem[] = [
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "YouTube", href: "#" },
];
