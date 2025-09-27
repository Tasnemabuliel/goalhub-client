import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, getRole, clearToken } from '../../lib/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const role = getRole();

  const handleLogout = () => {
    clearToken();
    navigate('/');
  };

  return (
    <nav dir="rtl" style={{ display: 'flex', gap: 16, padding: 16, background: '#eee' }}>
      <Link to="/">דף הבית</Link>
      {role === 'superadmin' && <Link to="/superadmin/dashboard">דשבורד סופר אדמין</Link>}
      {isAuthenticated() ? (
        <button onClick={handleLogout}>התנתק</button>
      ) : (
        <>
          <Link to="/superadmin/login">התחברות סופר אדמין</Link>
          <Link to="/superadmin/register">הרשמת סופר אדמין</Link>
        </>
      )}
    </nav>
  );
}
