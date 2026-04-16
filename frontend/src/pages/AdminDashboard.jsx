import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <h1>Admin Dashboard</h1>
      <p style={{ marginTop: '10px', fontSize: '18px' }}>Platform overview and analytics.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '30px' }}>
        <div style={{ background: 'var(--white)', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: 'var(--gray-mid)' }}>Total Users</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--dark)' }}>15,243</p>
        </div>
        <div style={{ background: 'var(--white)', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: 'var(--gray-mid)' }}>Active Courses</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--dark)' }}>342</p>
        </div>
        <div style={{ background: 'var(--white)', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: 'var(--gray-mid)' }}>Total Revenue</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--dark)' }}>₹7,056,000</p>
        </div>
        <div style={{ background: 'var(--white)', padding: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: 'var(--gray-mid)' }}>Instructors</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--dark)' }}>50</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
