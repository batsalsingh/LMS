import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const studentLinks = [
    { name: 'Dashboard', path: '/student/dashboard' },
    { name: 'My Courses', path: '/student/courses' },
    { name: 'Wishlist', path: '/student/wishlist' },
    { name: 'Profile', path: '/student/profile' },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Create Course', path: '/admin/create-course' },
    { name: 'Manage Courses', path: '/admin/manage-courses' },
    { name: 'Manage Users', path: '/admin/manage-users' },
  ];

  const instructorLinks = [
    { name: 'Dashboard', path: '/instructor/dashboard' },
    { name: 'Create Course', path: '/instructor/create-course' },
    { name: 'My Courses', path: '/instructor/my-courses' },
  ];

  let links;
  let title;
  if (role === 'admin') {
    links = adminLinks;
    title = 'Admin Portal';
  } else if (role === 'instructor') {
    links = instructorLinks;
    title = 'Instructor Hub';
  } else {
    links = studentLinks;
    title = 'My Learning';
  }

  return (
    <div style={{ width: '260px', background: 'var(--white)', color: 'var(--dark)', minHeight: '100vh', padding: '30px 24px', borderRight: '1px solid var(--gray-border)' }}>
      <h2 style={{ marginBottom: '40px', fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px' }}>
        {title}
      </h2>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {links.map((link) => (
          <li key={link.name}>
            <Link to={link.path} style={{ display: 'block', padding: '12px 16px', borderRadius: '8px', background: 'transparent', color: 'var(--dark)', textDecoration: 'none', fontWeight: '600', transition: 'all 0.2s', border: '1px solid transparent' }} onMouseOver={(e) => { e.currentTarget.style.background = 'var(--gray-light)'; e.currentTarget.style.borderColor = 'var(--gray-border)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <button
        style={{ marginTop: '50px', padding: '12px 16px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', width: '100%', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}
        onMouseOver={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#fff'; }}
        onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--primary)'; }}
        onClick={() => { localStorage.clear(); window.location.href = '/'; }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Sidebar;
