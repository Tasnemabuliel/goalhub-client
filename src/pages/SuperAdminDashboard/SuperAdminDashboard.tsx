import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRole, isAuthenticated } from '../../lib/auth'
import styles from './SuperAdminDashboard.module.css'

export default function SuperAdminDashboard() {
  const navigate = useNavigate()

  // בדיקה: אם לא מחובר או לא סופר אדמין → מחזירים לדף הבית
  useEffect(() => {
    if (!isAuthenticated() || getRole() !== 'superadmin') {
      navigate('/')
    }
  }, [navigate])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>דשבורד מנהל ראשי</h1>
      <p className={styles.text}>
        כאן יופיעו כרטיסיות ניהול: יצירת מאמנים, הוספת שחקנים, אימונים והודעות.
      </p>
    </div>
  )
}
