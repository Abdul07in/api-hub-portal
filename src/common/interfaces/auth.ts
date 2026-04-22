export interface PartnerUser {
  id: string;
  fullName: string;
  email: string;
  company: string;
  role: string;
  partnerCode: string;
  onboardingStatus: "pending" | "active" | "review";
  permissions: string[];
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: "Bearer";
  expiresAt: string;
}

export interface AuthSession {
  user: PartnerUser;
  tokens: AuthTokens;
}

export interface SpringBootJwtAuthResponse {
  user: PartnerUser;
  accessToken: string;
  refreshToken: string;
  tokenType: "Bearer";
  expiresAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  workEmail: string;
  company: string;
  role: string;
  password: string;
}
