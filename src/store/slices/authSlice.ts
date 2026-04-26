import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { AuthSession } from "@/common/interfaces/auth";
import { loadStoredAuthSession } from "@/portal/services/auth/storage";
import {
  loginPartner,
  registerPartner,
  logoutPartnerSession,
  type LoginPartnerInput,
  type RegisterPartnerInput,
} from "@/portal/services/auth";
import type { RootState } from "@/store";

type AuthStatus = "idle" | "loading" | "authenticated";
type PersistenceMode = "local" | "session";

export interface AuthState {
  status: AuthStatus;
  session: AuthSession | null;
  persistence: PersistenceMode | null;
  error: string | null;
}

const storedAuth = loadStoredAuthSession();

const initialState: AuthState = {
  status: storedAuth ? "authenticated" : "idle",
  session: storedAuth?.session ?? null,
  persistence: storedAuth?.persistence ?? null,
  error: null,
};

export const loginPartnerThunk = createAsyncThunk(
  "auth/loginPartner",
  async (input: LoginPartnerInput, thunkApi) => {
    try {
      return await loginPartner(input);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error instanceof Error ? error.message : "Unable to sign in right now.",
      );
    }
  },
);

export const registerPartnerThunk = createAsyncThunk(
  "auth/registerPartner",
  async (input: RegisterPartnerInput, thunkApi) => {
    try {
      return await registerPartner(input);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error instanceof Error ? error.message : "Unable to create the account right now.",
      );
    }
  },
);

export const logoutPartnerThunk = createAsyncThunk(
  "auth/logoutPartnerThunk",
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      const refreshToken = state.auth.session?.tokens?.refreshToken;
      if (refreshToken) {
        await logoutPartnerSession(refreshToken);
      }
      return true;
    } catch (error) {
      console.error("Logout error", error);
      return true; // Still logout locally
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
    logoutPartner: (state) => {
      state.status = "idle";
      state.session = null;
      state.persistence = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPartnerThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginPartnerThunk.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.session = action.payload.session;
        state.persistence = action.payload.persistence;
        state.error = null;
      })
      .addCase(loginPartnerThunk.rejected, (state, action) => {
        state.status = "idle";
        state.error = (action.payload as string) ?? "Unable to sign in right now.";
      })
      .addCase(registerPartnerThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerPartnerThunk.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.session = action.payload.session;
        state.persistence = action.payload.persistence;
        state.error = null;
      })
      .addCase(registerPartnerThunk.rejected, (state, action) => {
        state.status = "idle";
        state.error = (action.payload as string) ?? "Unable to create the account right now.";
      })
      .addCase(logoutPartnerThunk.fulfilled, (state) => {
        state.status = "idle";
        state.session = null;
        state.persistence = null;
        state.error = null;
      });
  },
});

export const { clearAuthError, logoutPartner } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.status === "authenticated";
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectPartnerSession = (state: RootState) => state.auth.session;
export const selectPartnerUser = (state: RootState) => state.auth.session?.user ?? null;

export default authSlice.reducer;
