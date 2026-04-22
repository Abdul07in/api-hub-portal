import type { AuthSession } from "@/common/interfaces/auth";

type PersistenceMode = "local" | "session";

interface StoredAuthPayload {
  session: AuthSession;
  persistence: PersistenceMode;
}

const AUTH_STORAGE_KEY = "partnerhub.auth.session";

function canUseStorage() {
  return typeof window !== "undefined";
}

function readStorage(mode: PersistenceMode): StoredAuthPayload | null {
  if (!canUseStorage()) return null;

  const storage = mode === "local" ? window.localStorage : window.sessionStorage;
  const raw = storage.getItem(AUTH_STORAGE_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredAuthPayload;
  } catch {
    storage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function loadStoredAuthSession(): StoredAuthPayload | null {
  return readStorage("session") ?? readStorage("local");
}

export function saveStoredAuthSession(payload: StoredAuthPayload | null) {
  if (!canUseStorage()) return;

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY);

  if (!payload) return;

  const storage = payload.persistence === "local" ? window.localStorage : window.sessionStorage;
  storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
}
