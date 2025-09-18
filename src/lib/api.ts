import { authHeader } from './auth'

// קביעת כתובת הבסיס:
// בזמן פיתוח נשתמש בשרת ה־API המקומי (פורט 4000)
// בפרודקשן נשלח בקשות יחסיות (כשהפרונט והבק־אנד מאוחדים)
const BASE_URL = import.meta.env.DEV
  ? 'http://localhost:4000/api'
  : '/api'

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...authHeader(),
    ...(options.headers || {})
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  if (!res.ok) {
    let message = `HTTP ${res.status}`
    try {
      const data = await res.json()
      message = (data as any)?.message || message
    } catch {
      // אם השרת לא מחזיר JSON, נשאיר את הסטטוס כברירת מחדל
    }
    throw new Error(message)
  }

  try {
    return (await res.json()) as T
  } catch {
    // אם אין גוף תשובה (204 למשל), נחזיר undefined
    return undefined as unknown as T
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  del: <T>(path: string) =>
    request<T>(path, { method: 'DELETE' })
}
