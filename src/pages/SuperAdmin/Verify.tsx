import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SuperAdminVerify() {
  const [params] = useSearchParams();
  const email = params.get('email') || '';
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/superadmin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otpCode: code })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'שגיאת שרת');
      navigate('/superadmin/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // שלח שוב קוד (פשוט שולח שוב ל-login, אפשר להרחיב)
  const handleResend = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/superadmin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: '' }) // יש להכניס סיסמה אם רוצים שליחה אמיתית
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'שגיאת שרת');
      alert('קוד נשלח מחדש (אם מותר לפי מגבלת זמן)');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" style={{ maxWidth: 400, margin: 'auto', padding: 24 }}>
      <h2>אימות קוד סופר אדמין</h2>
      <form onSubmit={handleSubmit}>
        <input value={code} onChange={e => setCode(e.target.value)} placeholder="קוד (6 ספרות)" required style={{ width: '100%', marginBottom: 8 }} />
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'בודק...' : 'אמת'}
        </button>
      </form>
      <button onClick={handleResend} disabled={loading} style={{ width: '100%', marginTop: 8 }}>
        שלח שוב קוד
      </button>
    </div>
  );
}
