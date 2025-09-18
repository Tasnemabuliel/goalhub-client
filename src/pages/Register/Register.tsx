import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../lib/api'
import { setToken } from '../../lib/auth'
import styles from './Register.module.css'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await api.post<{ token: string }>('/auth/register', { name, email, password })
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
      <h2 className={styles.title}>הרשמה</h2>
      <form onSubmit={handleSubmit} className={styles.grid}>
        <div className={`${styles.field} ${styles.full}`}>
          <label htmlFor="name">שם</label>
          <input id="name" className={styles.input} value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div className={styles.field}>
          <label htmlFor="email">אימייל</label>
          <input id="email" className={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">סיסמה</label>
          <input id="password" className={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button className={`${styles.btn} ${styles.full}`} type="submit" disabled={loading}>{loading ? 'נרשם…' : 'הרשם'}</button>
        {error && <p className={`${styles.error} ${styles.full}`}>{error}</p>}
      </form>
    </div>
  )
}

