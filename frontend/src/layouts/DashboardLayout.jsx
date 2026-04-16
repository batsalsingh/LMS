import React from 'react';
import Sidebar from '../components/Sidebar';

const DashboardLayout = ({ children, role = 'student' }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--white)' }}>
      <Sidebar role={role} />
      <div style={{ flex: 1, padding: '40px', background: 'var(--gray-light)', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
