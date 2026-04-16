import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { myEnrollments } from '../services/api';
import UnsplashImage from '../components/UnsplashImage';

const StudentDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await myEnrollments();
        setEnrollments(res.data.data !== undefined ? res.data.data : []);
      } catch (err) {
        console.error('Failed to fetch enrollments', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  return (
    <DashboardLayout role="student">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: 'var(--dark)', fontSize: '28px', fontWeight: '800' }}>My Courses</h1>
          <p style={{ color: 'var(--gray-mid)', marginTop: '8px' }}>Pick up where you left off</p>
        </div>
        <Link 
          to="/courses" 
          style={{ background: 'var(--primary)', color: 'var(--white)', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none' }}
        >
          Browse Catalog
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {loading ? (
          <p style={{ color: 'var(--dark)' }}>Loading your dashboard...</p>
        ) : enrollments.length === 0 ? (
          <div style={{ padding: '60px', background: 'var(--white)', borderRadius: '12px', textAlign: 'center', gridColumn: '1 / -1', border: '1px dashed var(--gray-border)' }}>
            <h3 style={{ color: 'var(--dark)', marginBottom: '16px', fontSize: '20px' }}>You haven't enrolled in any courses yet.</h3>
            <Link to="/courses" style={{ display: 'inline-block', background: 'var(--dark)', color: 'var(--white)', padding: '12px 24px', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}>
              Explore Courses
            </Link>
          </div>
        ) : (
          enrollments.map((record) => {
            const course = record.course || {};
            // Simple mockup progress calculation, can be dynamic later based on DB actuals
            const progress = record.progress || 0; 

            return (
              <div key={record._id || Math.random()} style={{ background: 'var(--white)', border: '1px solid var(--gray-border)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }} onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }} onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ height: '140px', background: 'var(--gray-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', overflow: 'hidden' }}>
                  <UnsplashImage query={course.title + " course computer"} alt={course.title} />
                </div>
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '12px', display: 'inline-block', padding: '4px 8px', background: 'var(--gray-light)', color: 'var(--gray-mid)', borderRadius: '4px', marginBottom: '12px', alignSelf: 'flex-start', fontWeight: 'bold' }}>
                    {course.category || 'General'}
                  </span>
                  <h4 style={{ color: 'var(--dark)', margin: '0 0 12px 0', fontSize: '18px', fontWeight: '800', lineHeight: '1.4' }}>
                    {course.title || 'Unknown Course'}
                  </h4>

                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: 'var(--gray-mid)', fontWeight: 'bold' }}>
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--gray-light)', borderRadius: '4px', marginBottom: '20px', overflow: 'hidden' }}>
                      <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)', borderRadius: '4px' }}></div>
                    </div>
                    <Link to={`/learn/${course._id}`} style={{ display: 'block', width: '100%', background: 'var(--dark)', color: 'var(--white)', textAlign: 'center', padding: '12px 0', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold', transition: 'background 0.2s' }}>
                      Continue Learning
                    </Link>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;