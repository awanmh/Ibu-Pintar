// src/services/ApiService.js
import axios from 'axios';
import store from '@/store';

const apiClient = axios.create({
  baseURL: 'https://ibupintar-production.up.railway.app/api',
  timeout: 10000,
});

// === Interceptor untuk menambahkan token ===
apiClient.interceptors.request.use(
  config => {
    const token = store.state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// === Auth ===
const register = userData => apiClient.post('/auth/register', userData);
const login = userData => apiClient.post('/auth/login', userData);
const googleLogin = tokenData => apiClient.post('/auth/google-login', tokenData);
const getMe = () => apiClient.get('/auth/me');

// === Artikel ===
const getArticles = () => apiClient.get('/articles');
const getArticle = id => apiClient.get(`/articles/${id}`);
const createArticle = data => apiClient.post('/articles', data);
const updateArticle = (id, data) => apiClient.put(`/articles/${id}`, data);
const deleteArticle = id => apiClient.delete(`/articles/${id}`);

// === Upload Gambar ===
const uploadImage = formData =>
  apiClient.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

// === Kategori ===
const getCategories = () => apiClient.get('/categories');

// === Forum Tanya Bidan ===
const getAllQuestions = () => apiClient.get('/tanya-bidan');
const getQuestionById = id => apiClient.get(`/tanya-bidan/${id}`);
const createQuestion = data => apiClient.post('/tanya-bidan', data);
const createAnswer = (questionId, answerData) =>
  apiClient.post(`/tanya-bidan/${questionId}/answers`, answerData);
const deleteQuestion = id => apiClient.delete(`/tanya-bidan/${id}`);

// === Reservasi ===
const submitReservation = data => apiClient.post('/reservations', data);
const getReservations = () => apiClient.get('/reservations');
const updateReservation = (id, data) => apiClient.put(`/reservations/${id}`, data);

// === Treatment ===
const getAllTreatments = () => apiClient.get('/treatments');
const getTreatmentById = id => apiClient.get(`/treatments/${id}`);
const createTreatment = data => apiClient.post('/treatments', data);
const updateTreatment = (id, data) => apiClient.put(`/treatments/${id}`, data);
const deleteTreatment = id => apiClient.delete(`/treatments/${id}`);
const getTreatmentBySlug = slug => apiClient.get(`/treatments/slug/${slug}`);
const addToPackage = (data) => apiClient.post('/add-to-package', data);


// === Export Semua API ===
export default {
  register,
  login,
  googleLogin,
  getMe,
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  uploadImage,
  getCategories,
  getAllQuestions,
  getQuestionById,
  createQuestion,
  createAnswer,
  deleteQuestion,
  submitReservation,
  getReservations,
  updateReservation,
  getAllTreatments,
  getTreatmentById,
  getTreatmentBySlug,
  createTreatment,
  updateTreatment,
  deleteTreatment,
  addToPackage,
};
