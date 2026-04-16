import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import { login as loginService } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const StudentLogin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginService({ email, password });
      const { token, data } = res.data;
      

      if (data.user.role === 'student') {
        login(data.user, token);
        navigate('/student/dashboard');
      } else {
        throw new Error('Not a student account. Please use the correct portal.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed, please check your credentials.');
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
          <h2 style={{ marginBottom: '8px', fontSize: '28px', fontWeight: '800', color: 'var(--dark)' }}>Student Login</h2>
          <p style={{ marginBottom: '32px', color: 'var(--gray-mid)', fontSize: '15px' }}>Log in to your Lumined account to continue learning.</p>      

          {error && <div style={{ color: 'red', marginBottom: '16px', background: '#ffebee', padding: '10px', borderRadius: '4px' }}>{error}</div>}     

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
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
            <div style={{ marginBottom: '8px' }}>
              <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', color: 'var(--dark)', fontSize: '14px' }}>Password</label>      
              <input
                type="password"
                placeholder="Enter your password"
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
            <div style={{ textAlign: 'right', marginBottom: '24px' }}>      
              <a href="#" style={{ color: 'var(--primary)', fontSize: '14px', fontWeight: '700' }}>Forgot password?</a>
            </div>

            <button type="submit" style={{
              width: '100%', background: 'var(--primary)', color: '#fff',   
              padding: '14px', fontWeight: 'bold', fontSize: '16px',        
              borderRadius: '4px', border: 'none', cursor: 'pointer',       
              marginBottom: '20px', transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = 'var(--primary-hover)'}
            onMouseOut={(e) => e.target.style.background = 'var(--primary)'}>
              Log In
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--gray-border)' }}>
            <p style={{ color: 'var(--dark)', fontSize: '15px' }}>
              Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: '700', marginLeft: '4px' }}>Sign up</Link>       
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;