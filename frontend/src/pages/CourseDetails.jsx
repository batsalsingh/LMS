import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, enrollInCourse } from '../services/api';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

const CourseDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await getCourseById(id);
                setCourse(res.data.data || res.data);
            } catch (err) {
                console.error("Failed to fetch course:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    const handleEnroll = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            setEnrolling(true);
            await enrollInCourse(id);
            navigate(`/learn/${id}`); // Go straight into learning page after buying
        } catch (err) {
            console.error(err);
            alert("Could not enroll. You may be already enrolled. Redirecting to course...");
            navigate(`/learn/${id}`);
        } finally {
            setEnrolling(false);
        }
    };

    if (loading) return <div><Navbar /><div style={{ padding: '40px', textAlign: 'center', color: 'var(--dark)' }}>Loading course details...</div></div>;
    if (!course) return <div><Navbar /><div style={{ padding: '40px', textAlign: 'center', color: 'var(--dark)' }}>Course not found.</div></div>;

    const totalLessons = course.modules?.reduce((acc, m) => acc + m.lessons.length, 0) || 0;

    return (
        <div style={{ backgroundColor: 'var(--gray-light)', minHeight: '100vh', color: 'var(--dark)' }}>
            <Navbar />
            <div style={{ backgroundColor: 'var(--dark)', color: 'var(--white)', padding: '60px 0', borderBottom: '4px solid var(--primary)' }}>
                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '40px', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                        <span style={{ display: 'inline-block', background: 'var(--primary)', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', marginBottom: '16px' }}>{course.category || 'General'}</span>
                        <h1 style={{ fontSize: '42px', marginBottom: '16px', fontWeight: '800', lineHeight: '1.2' }}>{course.title}</h1>
                        <p style={{ fontSize: '20px', marginBottom: '24px', opacity: 0.9, lineHeight: '1.5' }}>{course.description}</p>
                        <p style={{ fontSize: '16px', marginBottom: '24px', fontWeight: '600' }}>Created by {course.instructor?.name || 'Instructor'}</p>

                        <button
                            onClick={handleEnroll}
                            style={{ padding: '16px 32px', backgroundColor: 'var(--primary)', color: 'var(--white)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '18px', transition: 'all 0.2s', boxShadow: 'var(--shadow-md)' }}
                            disabled={enrolling}
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            {enrolling ? 'Processing...' : `Enroll Now for ₹${Math.round((course.price || 0) * 84)}`}
                        </button>
                    </div>
                </div>
            </div>

            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 0' }}>
               <h2 style={{ fontSize: '28px', marginBottom: '24px', fontWeight: '800' }}>Course Syllabus</h2>
               <p style={{ marginBottom: '30px', color: 'var(--gray-mid)', fontSize: '16px' }}>{course.modules?.length || 0} modules • {totalLessons} lessons in total</p>
               
               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                 {course.modules?.length === 0 ? (
                   <p>No syllabus available yet.</p>
                 ) : (
                   course.modules?.map((mod, index) => (
                     <div key={mod._id || index} style={{ background: 'var(--white)', border: '1px solid var(--gray-border)', borderRadius: '8px', overflow: 'hidden' }}>
                       <div style={{ padding: '20px 24px', background: 'var(--gray-light)', borderBottom: mod.lessons?.length > 0 ? '1px solid var(--gray-border)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>Module {index + 1}: {mod.title}</h3>
                         <span style={{ color: 'var(--gray-mid)', fontSize: '14px', fontWeight: '600' }}>{mod.lessons?.length || 0} lessons</span>
                       </div>
                       
                       {mod.lessons?.length > 0 && (
                         <div style={{ padding: '12px 24px' }}>
                           {mod.lessons.map((lesson, idx) => (
                             <div key={lesson._id || idx} style={{ padding: '12px 0', borderBottom: idx !== mod.lessons.length - 1 ? '1px solid var(--gray-border)' : 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                               <span style={{ color: 'var(--primary)', fontSize: '20px' }}>▶</span>
                               <span style={{ fontSize: '16px', fontWeight: '500' }}>{lesson.title}</span>
                               <span style={{ marginLeft: 'auto', color: 'var(--gray-mid)', fontSize: '14px' }}>{lesson.durationMin ? `${lesson.durationMin} mins` : 'Video'}</span>
                             </div>
                           ))}
                         </div>
                       )}
                     </div>
                   ))
                 )}
               </div>
            </div>
        </div>
    );
};

export default CourseDetails;
