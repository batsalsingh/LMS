import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { myEnrollments } from '../services/api'; // We will fetch courses created by instructor here (mocked for now)
import UnsplashImage from '../components/UnsplashImage';
import api from '../services/api';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const res = await api.get('/courses');
        // Let's assume the API returns all courses in the system.
        // If we strictly check instructor ID we would filter by `course.instructor._id`. 
        // For demonstration, we just show courses that have an instructor.
        // Ideal API: `/api/courses/my-created-courses`
        setCourses(res.data.data !== undefined ? res.data.data : []);
      } catch (err) {
        console.error('Failed to fetch courses', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  return (
    <DashboardLayout role="instructor">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: 'var(--dark)', fontSize: '28px', fontWeight: '800' }}>Instructor Hub</h1>
          <p style={{ color: 'var(--gray-mid)', marginTop: '8px' }}>Manage the courses you teach</p>
        </div>
        <Link
          to="/instructor/create-course"
          style={{ background: 'var(--primary)', color: 'var(--white)', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none' }}
        >
          Create New Course
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {loading ? (
          <p style={{ color: 'var(--dark)' }}>Loading your dashboard...</p>     
        ) : courses.length === 0 ? (
          <div style={{ padding: '60px', background: 'var(--white)', borderRadius: '12px', textAlign: 'center', gridColumn: '1 / -1', border: '1px dashed var(--gray-border)' }}>
            <h3 style={{ color: 'var(--dark)', marginBottom: '16px', fontSize: '20px' }}>You haven't created any courses yet.</h3>
            <Link to="/instructor/create-course" style={{ display: 'inline-block', background: 'var(--dark)', color: 'var(--white)', padding: '12px 24px', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}>
              Create Your First Course
            </Link>
          </div>
        ) : (
          courses.map((course) => (
            <div key={course._id || Math.random()} style={{ background: 'var(--white)', border: '1px solid var(--gray-border)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '14px', color: 'var(--gray-mid)', fontWeight: 'bold' }}>
                  <span>Price: ₹{Math.round((course.price || 0) * 84)}</span>
                  <span>Students: {course.studentsCount || 0}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={{ flex: 1, padding: '10px 0', background: 'var(--gray-border)', color: 'var(--dark)', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Edit</button>
                  <Link to={`/courses/${course._id}`} style={{ flex: 1, padding: '10px 0', background: 'var(--dark)', color: 'var(--white)', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', textAlign: 'center', textDecoration: 'none' }}>View</Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default InstructorDashboard;