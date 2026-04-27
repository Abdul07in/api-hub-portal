import { loadStoredAuthSession } from "@/portal/services/auth/storage";
import type { ApiResponse } from "@/portal/services/auth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const PROFILE_API_ENDPOINTS = {
  profile: `${BASE_URL}/v1/profile`,
  password: `${BASE_URL}/v1/profile/password`,
};

export interface ProfileResponse {
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  partnerCode: string;
  status: string;
  joinDate: string;
  emailAlerts: boolean;
  apiStatusUpdates: boolean;
  marketingComms: boolean;
}

export interface ProfileUpdateRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  emailAlerts: boolean;
  apiStatusUpdates: boolean;
  marketingComms: boolean;
}

export interface PasswordUpdateRequest {
  currentPassword?: string;
  newPassword?: string;
}

function getAuthHeaders(): HeadersInit {
  const authPayload = loadStoredAuthSession();
  const token = authPayload?.session?.tokens?.accessToken;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    traceId: crypto.randomUUID(),
    source: "PortalFrontend",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export async function fetchProfile(): Promise<ProfileResponse> {
  const response = await fetch(PROFILE_API_ENDPOINTS.profile, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData: ApiResponse<unknown> | unknown = await response.json().catch(() => ({}));
    throw new Error(
      (errorData as ApiResponse<unknown>)?.error?.message ||
        (errorData as { message?: string })?.message ||
        "Failed to fetch profile.",
    );
  }

  const resData: ApiResponse<ProfileResponse> = await response.json();
  if (!resData.success?.data) {
    throw new Error("Invalid response format received from server.");
  }
  return resData.success.data;
}

export async function updateProfile(input: ProfileUpdateRequest): Promise<ProfileResponse> {
  const response = await fetch(PROFILE_API_ENDPOINTS.profile, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const errorData: ApiResponse<unknown> | unknown = await response.json().catch(() => ({}));
    throw new Error(
      (errorData as ApiResponse<unknown>)?.error?.message ||
        (errorData as { message?: string })?.message ||
        "Failed to update profile.",
    );
  }

  const resData: ApiResponse<ProfileResponse> = await response.json();
  if (!resData.success?.data) {
    throw new Error("Invalid response format received from server.");
  }
  return resData.success.data;
}

export async function updatePassword(input: PasswordUpdateRequest): Promise<void> {
  const response = await fetch(PROFILE_API_ENDPOINTS.password, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const errorData: ApiResponse<unknown> | unknown = await response.json().catch(() => ({}));
    throw new Error(
      (errorData as ApiResponse<unknown>)?.error?.message ||
        (errorData as { message?: string })?.message ||
        "Failed to update password.",
    );
  }
}
