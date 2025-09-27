export const TOKEN_STORAGE_KEY = 'gh_token'
export const ROLE_STORAGE_KEY  = 'gh_role'

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY)
  } catch {
    return null
  }
}

export function setToken(token: string, role?: string): void {
  try {
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
    if (role) localStorage.setItem(ROLE_STORAGE_KEY, role)   // ← שמירת role
    window.dispatchEvent(new CustomEvent('auth:changed'))
  } catch {
    // ignore storage errors
  }
}

export function clearToken(): void {
  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    localStorage.removeItem(ROLE_STORAGE_KEY)
    window.dispatchEvent(new CustomEvent('auth:changed'))
  } catch {
    // ignore storage errors
  }
}

export function isAuthenticated(): boolean {
  return Boolean(getToken())
}

export function getRole(): string | null {
  try {
    return localStorage.getItem(ROLE_STORAGE_KEY)
  } catch {
    return null
  }
}

export function isAdmin(): boolean {
  const role = getRole();
  return role === 'admin' || role === 'superadmin';
}

export function authHeader(): Record<string, string> {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}
