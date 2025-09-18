import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, clearToken } from '../../lib/auth'
import styles from './Navbar.module.css'

export default function Navbar() {
  const navigate = useNavigate()
  const authed = isAuthenticated()

  function logout() {
    clearToken()
    navigate('/')
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>GoalHub ⚽</div>
      <ul className={styles.links}>
        <li><Link to="/">בית</Link></li>
        <li><Link to="/players">שחקנים</Link></li>
        {authed ? (
          <li><button onClick={logout}>התנתקות</button></li>
        ) : (
          <>
            <li><Link to="/login">התחברות</Link></li>
            <li><Link to="/register">הרשמה</Link></li>
          </>
        )}
      </ul>
    </nav>
  )
}
