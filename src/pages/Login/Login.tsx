import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../lib/api'
import { setToken } from '../../lib/auth'
import styles from './Login.module.css'

export default function Login() {
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
      const res = await api.post<{ token: string }>('/auth/login', { email, password })
      setToken(res.token)
      navigate('/players')
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>התחברות</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="email">אימייל</label>
          <input id="email" className={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">סיסמה</label>
          <input id="password" className={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button className={styles.btn} type="submit" disabled={loading}>{loading ? 'מתחבר…' : 'התחבר'}</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  )
}

