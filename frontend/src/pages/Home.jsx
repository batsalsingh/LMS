import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';
import { getCourses } from '../services/api';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourses();
        setCourses(res.data.data || res.data); // Adjust depending on response format
      } catch (err) {
        console.error("Error fetching courses", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--white)', minHeight: '100vh', color: 'var(--dark)' }}>
      <Banner />
      <Navbar />
      <Hero />
      <div className="container" style={{ padding: '20px 0' }}>
        <h2 className="section-title">A broad selection of courses</h2>
        <p style={{ marginBottom: '24px', color: 'var(--dark)', fontSize: '18px' }}>Choose from over 210,000 online video courses with new additions published every month</p>
        
        {loading ? (
          <p>Loading courses...</p>
        ) : courses.length === 0 ? (
          <p>No courses available at the moment.</p>
        ) : (
          <div className="courses-grid" style={{ marginTop: '30px' }}>
            {courses.map(course => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
