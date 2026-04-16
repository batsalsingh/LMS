
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';

const Login = () => {
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
          border: '1px solid var(--gray-border)',
          textAlign: 'center'
        }}>
          <h2 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: '800', color: 'var(--dark)' }}>Choose Login Portal</h2>
          
          <Link to="/student/login">
            <button style={{ width: '100%', padding: '14px', background: 'var(--primary)', color: 'white', fontWeight: 'bold', fontSize: '16px', borderRadius: '4px', border: 'none', cursor: 'pointer', marginBottom: '16px' }}>
              Student Login
            </button>
          </Link>
          
          <Link to="/instructor/login">
            <button style={{ width: '100%', padding: '14px', background: 'var(--dark)', color: 'white', fontWeight: 'bold', fontSize: '16px', borderRadius: '4px', border: 'none', cursor: 'pointer', marginBottom: '16px' }}>
              Instructor Login
            </button>
          </Link>

          <Link to="/admin/login">
            <button style={{ width: '100%', padding: '14px', background: 'var(--gray-mid)', color: 'white', fontWeight: 'bold', fontSize: '16px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
              Admin Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
