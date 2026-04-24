import type {
  AuthSession,
  LoginRequest,
  PartnerUser,
  RegisterRequest,
  SpringBootJwtAuthResponse,
} from "@/common/interfaces/auth";

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
  login: "http://localhost:8080/api/auth/login",
  register: "http://localhost:8080/api/auth/register",
  refresh: "http://localhost:8080/api/auth/refresh",
  logout: "http://localhost:8080/api/auth/logout",
  me: "http://localhost:8080/api/partner/me",
};

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

function getLoggerHeaders() {
  return {
    "traceId": crypto.randomUUID(),
    "source": "PortalFrontend",
    "profileRefNo": "",
    "whatsAppOptIn": "false",
  };
}

export async function loginPartner(input: LoginPartnerInput): Promise<AuthServiceResult> {
  const response = await fetch(AUTH_API_ENDPOINTS.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getLoggerHeaders(),
    },
    body: JSON.stringify({
      email: input.email,
      password: input.password,
      rememberMe: input.rememberMe,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Invalid credentials or account access denied.");
  }

  const data: SpringBootJwtAuthResponse = await response.json();

  return {
    session: toSession(data),
    persistence: input.rememberMe ? "local" : "session",
  };
}

export async function registerPartner(input: RegisterPartnerInput): Promise<AuthServiceResult> {
  const response = await fetch(AUTH_API_ENDPOINTS.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getLoggerHeaders(),
    },
    body: JSON.stringify({
      workEmail: input.workEmail,
      company: input.company,
      role: input.role,
      password: input.password,
      autoApprove: input.autoApprove,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Registration failed. Email might already exist.");
  }

  const data: SpringBootJwtAuthResponse = await response.json();

  return {
    session: toSession(data),
    persistence: "local",
  };
}
