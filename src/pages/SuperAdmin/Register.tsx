import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuperAdminRegister() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
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
      const res = await fetch('/api/superadmin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'שגיאת שרת');
      navigate(`/superadmin/verify?email=${encodeURIComponent(form.email)}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" style={{ maxWidth: 400, margin: 'auto', padding: 24 }}>
      <h2>הרשמת סופר אדמין</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="שם" value={form.name} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        <input name="email" type="email" placeholder="אימייל" value={form.email} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        <input name="password" type="password" placeholder="סיסמה" value={form.password} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        <input name="phone" placeholder="טלפון" value={form.phone} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'שולח...' : 'הרשמה'}
        </button>
      </form>
    </div>
  );
}
