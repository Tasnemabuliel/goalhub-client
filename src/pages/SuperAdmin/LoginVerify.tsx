import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setToken } from '../../lib/auth';

export default function SuperAdminLoginVerify() {
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
      const res = await fetch('/api/superadmin/login/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otpCode: code })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'שגיאת שרת');
      setToken(data.token, data.role);
      navigate('/superadmin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" style={{ maxWidth: 400, margin: 'auto', padding: 24 }}>
      <h2>אימות קוד בכניסה</h2>
      <form onSubmit={handleSubmit}>
        <input value={code} onChange={e => setCode(e.target.value)} placeholder="קוד (6 ספרות)" required style={{ width: '100%', marginBottom: 8 }} />
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'בודק...' : 'אמת והיכנס'}
        </button>
      </form>
    </div>
  );
}
