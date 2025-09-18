import { Link } from 'react-router-dom'
import styles from './Home.module.css'

export default function Home() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>GoalHub</h1>
      <h2 className={styles.subtitle}>מערכת לניהול שחקנים, אימונים ומשחקים</h2>
      <div className={styles.ctas}>
        <Link className={`${styles.btn} ${styles.primary}`} to="/login">כניסה</Link>
        <Link className={`${styles.btn} ${styles.secondary}`} to="/register">הרשמה</Link>
        <Link className={`${styles.btn} ${styles.tertiary}`} to="/players">לרשימת השחקנים</Link>
      </div>
    </section>
  )
}
