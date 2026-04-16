import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);

// Course APIs
export const getCourses = () => api.get('/courses');
export const getCourseById = (id) => api.get(`/courses/${id}`);
export const createCourse = (courseData) => api.post('/courses', courseData);

// Enrollment APIs
export const enrollInCourse = (courseId) => api.post(`/enrollments`, { courseId });
export const myEnrollments = () => api.get(`/enrollments`);

// User & Progress APIs
export const getUserProfile = () => api.get('/users/profile');
export const updateProgress = (progressData) => api.post('/progress', progressData);
export const getMyProgress = (courseId) => api.get(`/progress/${courseId}`);
// Tutors API
export const bookTutorSession = (tutorId, date) => api.post('/tutors/book', { tutorId, date: date || new Date().toISOString() });
// Wishlist & Cart
export const addToWishlist = (courseId) => api.post('/wishlist', { courseId });
export const getWishlist = () => api.get('/wishlist');
export const removeFromWishlist = (courseId) => api.delete(`/wishlist/${courseId}`);
// Default export is essential for when you just import `api` directly 
// e.g. `import api from '../services/api';`
export default api;