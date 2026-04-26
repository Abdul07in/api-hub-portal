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

export interface ApiResponse<T> {
  status: number;
  code: string;
  success?: {
    message: string;
    data: T;
  };
  error?: {
    message: string;
    data: any;
  };
  metadata?: {
    timestamp: string;
    traceId: string;
  };
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const AUTH_API_ENDPOINTS = {
  login: `${BASE_URL}/auth/login`,
  register: `${BASE_URL}/auth/register`,
  refresh: `${BASE_URL}/auth/refresh`,
  logout: `${BASE_URL}/auth/logout`,
  me: `${BASE_URL}/partner/me`,
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
    traceId: crypto.randomUUID(),
    source: "PortalFrontend",
    profileRefNo: "",
    whatsAppOptIn: "false",
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
    const errorData: ApiResponse<any> | any = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || errorData?.message || "Invalid credentials or account access denied.");
  }

  const resData: ApiResponse<SpringBootJwtAuthResponse> = await response.json();
  if (!resData.success?.data) {
    throw new Error("Invalid response format received from server.");
  }
  const data: SpringBootJwtAuthResponse = resData.success.data;

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
    const errorData: ApiResponse<any> | any = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || errorData?.message || "Registration failed. Email might already exist.");
  }

  const resData: ApiResponse<SpringBootJwtAuthResponse> = await response.json();
  if (!resData.success?.data) {
    throw new Error("Invalid response format received from server.");
  }
  const data: SpringBootJwtAuthResponse = resData.success.data;

  return {
    session: toSession(data),
    persistence: "local",
  };
}
