import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MegaMenu from './MegaMenu';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--gray-border)' }}>
      <div className="nav-logo" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link to="/">
          <h1 style={{ letterSpacing: '-1px' }}>Lumined</h1>
        </Link>
        <ul className="nav-links" style={{ display: 'flex', gap: '20px', margin: 0, padding: 0 }}>
          <li><Link to="/courses" style={{ color: 'var(--dark)', fontWeight: '600' }}>Browse Courses</Link></li>
          <li><Link to="/tutors" style={{ color: 'var(--dark)', fontWeight: '600' }}>Find Tutors</Link></li>
        </ul>
      </div>

      <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span
          onClick={toggleTheme}
          style={{ fontSize: '1.2rem', cursor: 'pointer', background: 'var(--gray-light)', padding: '8px', borderRadius: '50%', border: '1px solid var(--gray-border)' }}
          title="Toggle Theme"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </span>

        {user ? (
          <>
            {user.role === 'admin' ? (
              <Link to="/admin/dashboard" style={{ color: 'var(--dark)', fontWeight: 'bold' }}>Admin Dashboard</Link>
            ) : user.role === 'instructor' ? (
              <Link to="/instructor/dashboard" style={{ color: 'var(--dark)', fontWeight: 'bold' }}>Instructor Dashboard</Link>
            ) : (
              <Link to="/student/dashboard" style={{ color: 'var(--dark)', fontWeight: 'bold' }}>My Learning</Link>
            )}
            <button onClick={handleLogout} className="btn-login" style={{ marginLeft: '10px' }}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/login"><button className="btn-login">Log In</button></Link>  
            <Link to="/signup"><button className="btn-signup">Sign Up</button></Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;