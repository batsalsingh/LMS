import React from 'react';
import { Link } from 'react-router-dom';
import UnsplashImage from './UnsplashImage';

const CourseCard = ({ course }) => {
  return (
    <Link to={`/courses/${course._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="course-card">
        <div style={{ height: '155px', width: '100%', overflow: 'hidden' }}>
          <UnsplashImage query={course.title + " course"} alt={course.title} />
        </div>
        <div className="course-info">
          <div className="course-title">{course.title}</div>
          <div className="course-instructor">{course.instructor?.name || 'Instructor Name'}</div>
          <div className="course-rating">
            {4.6} <span className="stars">★★★★★</span> <span style={{ color: 'var(--gray-mid)', fontWeight: 'normal', fontSize: '12px' }}>({492})</span>
          </div>
          <div className="course-price">₹{Math.round((course.price || 0) * 84)}</div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
