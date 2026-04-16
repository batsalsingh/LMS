import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import { register as registerService } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await registerService({ name, email, password, role });
      const { token, data } = res.data;
      
      // Call the login context function to set token and state globally
      login(data.user, token);

      // Successfully registered and logged in, redirect to student dashboard
      if (data.user.role === 'admin') { navigate('/admin/dashboard'); } else if (data.user.role === 'instructor') { navigate('/instructor/dashboard'); } else { navigate('/student/dashboard'); }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--white)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Banner />
      <Navbar />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 24px', backgroundColor: 'var(--gray-light)' }}>
        <div style={{
          maxWidth: '450px', width: '100%',
          background: 'var(--white)',
          padding: '40px',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--gray-border)'
        }}>
          <h2 style={{ marginBottom: '8px', fontSize: '28px', fontWeight: '800', color: 'var(--dark)' }}>Sign Up and Start Learning!</h2>
          <p style={{ marginBottom: '32px', color: 'var(--gray-mid)', fontSize: '15px' }}>Join Lumined today to map your future.</p>

          {error && <div style={{ color: '#d32f2f', marginBottom: '16px', background: '#ffebee', padding: '10px', borderRadius: '4px', fontSize: '14px' }}>{error}</div>}

          <form onSubmit={handleSignup}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: 'var(--dark)', fontSize: '14px' }}>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: '100%', padding: '14px 16px',
                  border: '1px solid var(--gray-border)',
                  borderRadius: '4px',
                  backgroundColor: 'transparent',
                  color: 'var(--dark)',
                  outline: 'none',
                  fontSize: '15px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: 'var(--dark)', fontSize: '14px' }}>Email</label>
              <input
                type="email"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%', padding: '14px 16px',
                  border: '1px solid var(--gray-border)',
                  borderRadius: '4px',
                  backgroundColor: 'transparent',
                  color: 'var(--dark)',
                  outline: 'none',
                  fontSize: '15px'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: 'var(--dark)', fontSize: '14px' }}>Password</label>
              <input
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%', padding: '14px 16px',
                  border: '1px solid var(--gray-border)',
                  borderRadius: '4px',
                  backgroundColor: 'transparent',
                  color: 'var(--dark)',
                  outline: 'none',
                  fontSize: '15px'
                }}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: 'var(--dark)', fontSize: '14px' }}>Account Type</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} required style={{ width: '100%', padding: '14px 16px', border: '1px solid var(--gray-border)', borderRadius: '4px', backgroundColor: 'transparent', color: 'var(--dark)', outline: 'none', fontSize: '15px' }}>
                <option value='student'>Student</option>
                <option value='instructor'>Instructor</option>
                <option value='admin'>Admin</option>
              </select>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', background: loading ? 'var(--gray-mid)' : 'var(--primary)', color: '#fff',
              padding: '14px', fontWeight: 'bold', fontSize: '16px',
              borderRadius: '4px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '20px', transition: 'background 0.2s'
            }}
            onMouseOver={(e) => !loading && (e.target.style.background = 'var(--primary-hover)')}
            onMouseOut={(e) => !loading && (e.target.style.background = 'var(--primary)')}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--gray-border)' }}>
            <p style={{ color: 'var(--dark)', fontSize: '15px' }}>
              Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '700', marginLeft: '4px' }}>Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;