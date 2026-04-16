import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-wrapper">
        <div className="hero-card">
          <h1>Welcome to Lumined</h1>
          <p>Learn from the brightest minds. Access thousands of high-quality courses for a fraction of the cost. Start mapping your future today.</p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link to="/courses"><button className="btn-signup" style={{ padding: '14px 28px', fontSize: '15px' }}>Explore Courses</button></Link>
            <Link to="/signup"><button className="btn-login" style={{ padding: '14px 28px', fontSize: '15px' }}>View Pricing</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
