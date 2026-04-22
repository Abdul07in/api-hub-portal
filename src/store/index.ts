import { configureStore } from "@reduxjs/toolkit";
import apiCatalogReducer from "./slices/apiCatalogSlice";
import authReducer from "./slices/authSlice";
import { saveStoredAuthSession } from "@/portal/services/auth/storage";

export const store = configureStore({
  reducer: {
    apiCatalog: apiCatalogReducer,
    auth: authReducer,
  },
});

store.subscribe(() => {
  const authState = store.getState().auth;

  if (authState.status !== "authenticated" || !authState.session || !authState.persistence) {
    saveStoredAuthSession(null);
    return;
  }

  saveStoredAuthSession({
    session: authState.session,
    persistence: authState.persistence,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
