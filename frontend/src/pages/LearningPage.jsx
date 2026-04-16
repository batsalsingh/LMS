import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCourseById, updateProgress, getMyProgress } from '../services/api';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

const LearningPage = () => {
  const { courseId } = useParams();
  const { user } = useContext(AuthContext);
  
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseAndProgress = async () => {
      try {
        const [courseRes, progressRes] = await Promise.all([
          getCourseById(courseId),
          getMyProgress(courseId)
        ]);

        const courseData = courseRes.data.data || courseRes.data;
        const progressData = progressRes.data.data || progressRes.data || { completedLessonIds: [] };
        
        setCourse(courseData);
        setProgress(progressData);

        // Find first active lesson
        if (courseData && courseData.modules && courseData.modules.length > 0) {
          const firstMod = courseData.modules[0];
          if (firstMod.lessons && firstMod.lessons.length > 0) {
            setActiveLesson(firstMod.lessons[0]);
          }
        }
      } catch (err) {
        console.error("Error loading learning page data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseAndProgress();
  }, [courseId]);

  const handleMarkComplete = async () => {
    if (!activeLesson) return;
    
    const newCompleted = [...(progress?.completedLessonIds || []), activeLesson._id];
    
    // Optimistic update
    setProgress(prev => ({
      ...prev,
      completedLessonIds: newCompleted
    }));

    try {
      await updateProgress({
        courseId,
        completedLessonIds: newCompleted,
        lastLessonId: activeLesson._id
      });
    } catch (err) {
      console.error("Failed to sync progress:", err);
    }
  };

  const isCompleted = (lessonId) => {
    return progress?.completedLessonIds?.includes(lessonId);
  };

  if (loading) return <div><Navbar /><div style={{ padding: '40px', textAlign: 'center', color: 'var(--dark)' }}>Loading your course...</div></div>;
  if (!course) return <div><Navbar /><div style={{ padding: '40px', textAlign: 'center', color: 'var(--dark)' }}>Course not found.</div></div>;

  return (
    <div style={{ background: 'var(--gray-light)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Main Video Area */}
        <div style={{ flex: '1', padding: '30px', display: 'flex', flexDirection: 'column', background: 'var(--white)' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--dark)', marginBottom: '20px' }}>
            {course.title} <span style={{ color: 'var(--gray-mid)', fontWeight: 'normal', fontSize: '18px' }}>/ {activeLesson?.title}</span>
          </h1>

<div style={{ flex: 1, background: 'var(--dark)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '500px', width: '100%', flexDirection: 'column', color: 'var(--white)' }}>
            <iframe 
              width="100%" 
              height="500px" 
              style={{ borderRadius: '12px' }}
              src={activeLesson?.videoUrl || "https://www.youtube.com/embed/SqcY0GlETPk?si=WpQn3FkR7S99vR2U"} 
              title="Course Video" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>

          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '16px', color: 'var(--gray-mid)' }}>
              Lesson contains video and reading material.
            </div>
            <button 
              onClick={handleMarkComplete}
              disabled={isCompleted(activeLesson?._id)}
              style={{
                background: isCompleted(activeLesson?._id) ? '✅ Completed' : 'var(--primary)',
                color: isCompleted(activeLesson?._id) ? 'var(--gray-mid)' : 'var(--white)',
                padding: '12px 24px',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: isCompleted(activeLesson?._id) ? 'not-allowed' : 'pointer',
                border: 'none'
              }}
            >
              {isCompleted(activeLesson?._id) ? '✓ Completed' : 'Mark as Complete'}
            </button>
          </div>
        </div>

        {/* Right Sidebar Syllabus */}
        <div style={{ width: '350px', background: 'var(--white)', borderLeft: '1px solid var(--gray-border)', overflowY: 'auto' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--gray-border)', position: 'sticky', top: 0, background: 'var(--white)', zIndex: 10 }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--dark)' }}>Course Content</h3>
            <div style={{ height: '6px', background: 'var(--gray-light)', borderRadius: '3px', marginTop: '12px', overflow: 'hidden' }}>
              <div style={{ width: `${(progress?.completedLessonIds?.length || 0) / Math.max(1, course.modules?.reduce((acc, m) => acc + m.lessons.length, 0)) * 100}%`, height: '100%', background: 'var(--primary)' }}></div>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--gray-mid)', marginTop: '8px', fontWeight: 'bold' }}>
              {progress?.completedLessonIds?.length || 0} / {course.modules?.reduce((acc, m) => acc + m.lessons.length, 0) || 0} lessons completed
            </p>
          </div>

          <div>
            {course.modules?.length === 0 ? (
              <div style={{ padding: '24px', color: 'var(--gray-mid)' }}>No modules loaded for this course yet.</div>
            ) : (
              course.modules?.map((mod, index) => (
                <div key={mod._id || index} style={{ borderBottom: '1px solid var(--gray-border)' }}>
                  <div style={{ padding: '16px 24px', background: 'var(--gray-light)', fontWeight: 'bold', color: 'var(--dark)', fontSize: '14px' }}>
                    Module {index + 1}: {mod.title}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {mod.lessons?.map(lesson => (
                      <li key={lesson._id} onClick={() => setActiveLesson(lesson)} style={{ padding: '16px 24px', cursor: 'pointer', borderLeft: `3px solid ${activeLesson?._id === lesson._id ? 'var(--primary)' : 'transparent'}`, background: activeLesson?._id === lesson._id ? 'var(--gray-light)' : 'transparent', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${isCompleted(lesson._id) ? 'var(--primary)' : 'var(--gray-border)'}`, background: isCompleted(lesson._id) ? 'var(--primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          {isCompleted(lesson._id) && <span style={{ color: '#fff', fontSize: '10px' }}>✓</span>}
                        </div>
                        <span style={{ fontSize: '14px', color: 'var(--dark)', fontWeight: activeLesson?._id === lesson._id ? 'bold' : 'normal' }}>
                          {lesson.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default LearningPage;
