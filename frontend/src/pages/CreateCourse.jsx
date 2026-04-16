import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { createCourse } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const CreateCourse = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('Web Development');
  const [level, setLevel] = useState('Beginner');
  const [modules, setModules] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Restrict to admins and instructors
  if (user && user.role === 'student') {
    return (
      <DashboardLayout role="student">
        <div style={{ textAlign: 'center', padding: '40px', background: 'var(--white)', borderRadius: '12px' }}>
          <h2 style={{ color: 'var(--dark)' }}>Access Denied</h2>
          <p style={{ color: 'var(--gray-mid)', marginTop: '8px' }}>Your current account is set to student. Only Instructors and Admins can create courses.</p>
          <div style={{ marginTop: '20px' }}>
            <button onClick={() => alert('Please contact an Admin (or update your MongoDB role) to become an Instructor.')} style={{ background: 'var(--primary)', color: 'var(--white)', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold' }}>Request Instructor Access</button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleAddModule = () => {
    setModules([...modules, { title: '', lessons: [] }]);
  };

  const handleUpdateModule = (modIndex, newTitle) => {
    const updated = [...modules];
    updated[modIndex].title = newTitle;
    setModules(updated);
  };

  const handleAddLesson = (modIndex) => {
    const updated = [...modules];
    updated[modIndex].lessons.push({ title: '', content: '', videoUrl: '', durationMin: 10 });
    setModules(updated);
  };

  const handleUpdateLesson = (modIndex, lessIndex, field, value) => {
    const updated = [...modules];
    updated[modIndex].lessons[lessIndex][field] = value;
    setModules(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const payload = {
        title,
        description,
        price: Number(price),
        category,
        level,
        modules,
      };

      await createCourse(payload);
      alert('Course Created Successfully!');
      navigate('/courses');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Failed to create course. Ensure you have Instructor permissions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="admin">
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--white)', padding: '40px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--gray-border)' }}>
        <h1 style={{ color: 'var(--dark)', fontSize: '28px', marginBottom: '8px' }}>Create New Course</h1>
        <p style={{ color: 'var(--gray-mid)', marginBottom: '32px' }}>Publish your knowledge to the world. Add your syllabus and lessons below.</p>
        
        {errorMsg && (
          <div style={{ background: '#ffecec', color: '#c0392b', padding: '16px', borderRadius: '6px', marginBottom: '24px', border: '1px solid #ffcccc' }}>
            <strong>Error:</strong> {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Header Info */}
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: 'var(--dark)' }}>Course Title *</label>
            <input required type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Master Python Programming" style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-border)', borderRadius: '6px', background: 'var(--gray-light)', color: 'var(--dark)' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: 'var(--dark)' }}>Description *</label>
            <textarea required rows="4" value={description} onChange={e => setDescription(e.target.value)} placeholder="What will students learn?" style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-border)', borderRadius: '6px', background: 'var(--gray-light)', color: 'var(--dark)' }}></textarea>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: 'var(--dark)' }}>Price ($) *</label>
              <input required type="number" min="0" step="0.01" value={price} onChange={e => setPrice(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-border)', borderRadius: '6px', background: 'var(--gray-light)', color: 'var(--dark)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: 'var(--dark)' }}>Category *</label>
              <select required value={category} onChange={e => setCategory(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-border)', borderRadius: '6px', background: 'var(--gray-light)', color: 'var(--dark)' }}>
                <option>Web Development</option>
                <option>Data Science</option>
                <option>Cybersecurity</option>
                <option>Design</option>
                <option>Business</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: 'var(--dark)' }}>Level *</label>
              <select required value={level} onChange={e => setLevel(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-border)', borderRadius: '6px', background: 'var(--gray-light)', color: 'var(--dark)' }}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--gray-border)', margin: '20px 0' }} />

          {/* Syllabus Builder */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '20px', color: 'var(--dark)' }}>Course Syllabus</h2>
              <button type="button" onClick={handleAddModule} style={{ background: 'var(--gray-light)', color: 'var(--dark)', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', border: '1px solid var(--gray-border)' }}>+ Add Module</button>
            </div>

            {modules.map((mod, mIdx) => (
              <div key={mIdx} style={{ background: 'var(--gray-light)', border: '1px solid var(--gray-border)', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <input 
                  type="text" 
                  placeholder={`Module ${mIdx + 1} Title`} 
                  required
                  value={mod.title} 
                  onChange={e => handleUpdateModule(mIdx, e.target.value)} 
                  style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-border)', borderRadius: '6px', marginBottom: '16px', fontWeight: 'bold', background: 'var(--white)', color: 'var(--dark)' }} 
                />

                <div style={{ marginLeft: '20px', borderLeft: '2px solid var(--gray-border)', paddingLeft: '20px' }}>
                  {mod.lessons.map((lesson, lIdx) => (
                    <div key={lIdx} style={{ background: 'var(--white)', padding: '16px', borderRadius: '6px', border: '1px solid var(--gray-border)', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <input 
                        type="text" 
                        required
                        placeholder={`Lesson ${lIdx + 1} Title`} 
                        value={lesson.title} 
                        onChange={e => handleUpdateLesson(mIdx, lIdx, 'title', e.target.value)} 
                        style={{ width: '100%', padding: '10px', border: '1px solid var(--gray-border)', borderRadius: '4px', background: 'var(--white)', color: 'var(--dark)' }} 
                      />
                      
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <input 
                          type="text" 
                          placeholder="Video URL (e.g. YouTube / MP4 link)" 
                          value={lesson.videoUrl} 
                          onChange={e => handleUpdateLesson(mIdx, lIdx, 'videoUrl', e.target.value)} 
                          style={{ flex: 2, padding: '10px', border: '1px solid var(--gray-border)', borderRadius: '4px', background: 'var(--white)', color: 'var(--dark)' }} 
                        />
                        <input 
                          type="number" 
                          placeholder="Duration (Mins)" 
                          value={lesson.durationMin} 
                          onChange={e => handleUpdateLesson(mIdx, lIdx, 'durationMin', e.target.value)} 
                          style={{ flex: 1, padding: '10px', border: '1px solid var(--gray-border)', borderRadius: '4px', background: 'var(--white)', color: 'var(--dark)' }} 
                        />
                      </div>

                      <textarea 
                        rows="2" 
                        placeholder="Lesson text / reading material content..." 
                        required
                        value={lesson.content} 
                        onChange={e => handleUpdateLesson(mIdx, lIdx, 'content', e.target.value)} 
                        style={{ width: '100%', padding: '10px', border: '1px solid var(--gray-border)', borderRadius: '4px', background: 'var(--white)', color: 'var(--dark)' }} 
                      ></textarea>
                    </div>
                  ))}

                  <button type="button" onClick={() => handleAddLesson(mIdx)} style={{ background: 'transparent', color: 'var(--primary)', padding: '8px 0', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>+ Add Lesson to Module</button>
                </div>
              </div>
            ))}
            
            {modules.length === 0 && <p style={{ color: 'var(--gray-mid)', fontStyle: 'italic' }}>No modules added yet. A course needs at least one module.</p>}
          </div>

          <button type="submit" disabled={loading} style={{ background: 'var(--primary)', color: '#fff', padding: '16px', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', marginTop: '20px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Publishing Course...' : 'Publish Course'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateCourse;
