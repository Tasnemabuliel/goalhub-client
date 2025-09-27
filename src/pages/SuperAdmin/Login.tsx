import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuperAdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/superadmin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'שגיאת שרת');
      navigate(`/superadmin/login/verify?email=${encodeURIComponent(form.email)}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" style={{ maxWidth: 400, margin: 'auto', padding: 24 }}>
      <h2>התחברות סופר אדמין</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="אימייל" value={form.email} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        <input name="password" type="password" placeholder="סיסמה" value={form.password} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'שולח...' : 'התחבר'}
        </button>
      </form>
    </div>
  );
}
