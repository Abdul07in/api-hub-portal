import type {
  AuthSession,
  LoginRequest,
  PartnerUser,
  RegisterRequest,
  SpringBootJwtAuthResponse,
} from "@/common/interfaces/auth";
import mockUsers from "./mockUsers.json";

export interface LoginPartnerInput extends LoginRequest {
  rememberMe: boolean;
}

export interface RegisterPartnerInput extends RegisterRequest {
  autoApprove?: boolean;
}

export interface AuthServiceResult {
  session: AuthSession;
  persistence: "local" | "session";
}

export const AUTH_API_ENDPOINTS = {
  login: "/api/auth/login",
  register: "/api/auth/register",
  refresh: "/api/auth/refresh",
  logout: "/api/auth/logout",
  me: "/api/partner/me",
};

function base64UrlEncode(value: string) {
  const encoded = btoa(value);
  return encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function createMockJwt(user: PartnerUser) {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64UrlEncode(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      company: user.company,
      role: user.role,
      permissions: user.permissions,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    }),
  );

  return `${header}.${payload}.partnerhub-mock-signature`;
}

function createPartnerUser(
  input: Pick<RegisterRequest, "fullName" | "workEmail" | "company" | "role">,
  onboardingStatus: PartnerUser["onboardingStatus"] = "active",
): PartnerUser {
  const nameSlug = input.fullName.trim().toLowerCase().replace(/\s+/g, "-");
  const companySlug = input.company
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 5);

  return {
    id: `partner-${nameSlug || "user"}`,
    fullName: input.fullName.trim(),
    email: input.workEmail.trim().toLowerCase(),
    company: input.company.trim(),
    role: input.role.trim(),
    partnerCode: `PH-${companySlug || "ICICI"}-01`,
    onboardingStatus,
    permissions: ["catalog:read", "sandbox:run", "partner:dashboard"],
    isSubscribed: false,
  };
}

function toSession(response: SpringBootJwtAuthResponse): AuthSession {
  return {
    user: response.user,
    tokens: {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      tokenType: response.tokenType,
      expiresAt: response.expiresAt,
    },
  };
}

async function simulateNetworkDelay() {
  await new Promise((resolve) => window.setTimeout(resolve, 650));
}

export async function loginPartner(input: LoginPartnerInput): Promise<AuthServiceResult> {
  await simulateNetworkDelay();

  if (input.email.includes("blocked")) {
    throw new Error("Your partner access is under review. Please contact support.");
  }

  const foundMockUser = mockUsers.find(u => u.email === input.email && u.password === input.password);

  let user: PartnerUser;

  if (foundMockUser) {
    user = createPartnerUser(
      {
        fullName: foundMockUser.fullName,
        workEmail: foundMockUser.email,
        company: foundMockUser.company,
        role: foundMockUser.role,
      },
      "active",
    );
    user.isSubscribed = foundMockUser.isSubscribed;
  } else {
    const displayName = input.email.split("@")[0].replace(/[._-]+/g, " ");
    const fullName = displayName
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    user = createPartnerUser(
      {
        fullName: fullName || "Partner User",
        workEmail: input.email,
        company: "ICICI Prudential Partner",
        role: "Integration Manager",
      },
      "active",
    );
  }

  const response: SpringBootJwtAuthResponse = {
    user,
    accessToken: createMockJwt(user),
    refreshToken: `refresh-${user.id}-${Date.now()}`,
    tokenType: "Bearer",
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  };

  return {
    session: toSession(response),
    persistence: input.rememberMe ? "local" : "session",
  };
}

export async function registerPartner(input: RegisterPartnerInput): Promise<AuthServiceResult> {
  await simulateNetworkDelay();

  const user = createPartnerUser(
    {
      fullName: input.fullName,
      workEmail: input.workEmail,
      company: input.company,
      role: input.role,
    },
    input.autoApprove === false ? "pending" : "active",
  );

  const response: SpringBootJwtAuthResponse = {
    user,
    accessToken: createMockJwt(user),
    refreshToken: `refresh-${user.id}-${Date.now()}`,
    tokenType: "Bearer",
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  };

  return {
    session: toSession(response),
    persistence: "local",
  };
}
