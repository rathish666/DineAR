const SESSION_KEY = "dinear:admin-session";

// NOTE: This is a lightweight client-side gate suitable for keeping the
// admin screen out of casual customers' hands. Because this is a static
// site with no backend, the password ships inside the JS bundle and can
// be read by anyone who inspects it — it is NOT real security against a
// determined visitor. For genuine protection, put an authenticated API
// or a hosting-level password (e.g. Vercel Password Protection on the
// Pro plan) in front of the /admin route.

function getAdminPassword(): string {
  return import.meta.env.VITE_ADMIN_PASSWORD || "admin123";
}

export function isAdminAuthed(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

export function tryAdminLogin(password: string): boolean {
  if (password === getAdminPassword()) {
    sessionStorage.setItem(SESSION_KEY, "true");
    return true;
  }
  return false;
}

export function adminLogout() {
  sessionStorage.removeItem(SESSION_KEY);
}
