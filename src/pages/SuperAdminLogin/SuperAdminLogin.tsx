import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../lib/api'
import { setToken } from '../../lib/auth'
import styles from './SuperAdminLogin.module.css'

export default function SuperAdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // שליחת בקשה לשרת
      const res = await api.post<{ token: string; role: string }>(
        '/auth/login',
        { email, password }
      )

      // בדיקה שהמשתמש הוא superadmin בלבד
      if (res.role !== 'superadmin') {
        setError('אין הרשאה – משתמש זה אינו מנהל ראשי')
        setLoading(false)
        return
      }

      // שמירת טוקן + role
      setToken(res.token, res.role)

      // ניתוב לדשבורד
      navigate('/superadmin/dashboard')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>כניסת מנהל ראשי</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="email">אימייל</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password">סיסמה</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <button
          type="submit"
          className={styles.button}
          disabled={loading}
        >
          {loading ? 'מתחבר…' : 'התחבר'}
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  )
}
