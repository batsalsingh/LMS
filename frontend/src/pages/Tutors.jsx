import React, { useState, useEffect } from 'react';
import { bookTutorSession } from '../services/api';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleBookSession = async (tutorId) => {
    try {
      await bookTutorSession(tutorId);
      alert('Session booked successfully!');
    } catch (error) {
      console.error('Failed to book session:', error);
      alert('Failed to book session. Please log in first.');
    }
  };

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/tutors');
        setTutors(data.data || data);
      } catch (error) {
        console.error('Failed to load tutors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
        <h1 style={{ marginBottom: '10px' }}>Meet Our Tutors</h1>
        <p style={{ color: 'var(--gray-dark)', marginBottom: '40px' }}>Learn from industry experts with real-world experience.</p>
        
        {loading ? (
          <p>Loading expert tutors...</p>
        ) : tutors.length === 0 ? (
          <div style={{ padding: '40px', background: 'var(--gray-light)', borderRadius: '12px', textAlign: 'center' }}>
            <p>No tutors currently available.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            {tutors.map((tutor) => (
              <div key={tutor._id} style={{ 
                border: '1px solid var(--gray-border)', 
                borderRadius: '16px', 
                padding: '24px',
                background: 'var(--white)',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>{tutor.image || '👤'}</div>
                <h3 style={{ marginBottom: '8px' }}>{tutor.name}</h3>
                <div style={{ color: 'var(--primary)', fontWeight: 'bold', marginBottom: '16px' }}>
                  {tutor.speciality}
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', color: 'var(--gray-dark)', fontSize: '0.9rem', marginBottom: '24px' }}>
                  <span>⭐ {tutor.rating}</span>
                  <span>👨‍🎓 {tutor.students} Students</span>
                </div>
                
                <button
                  onClick={() => handleBookSession(tutor._id)}
                  style={{ width: '100%', padding: '12px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Book Session
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Tutors;