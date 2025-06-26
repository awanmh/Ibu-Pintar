// src/services/ApiService.js
import axios from 'axios';

// Konfigurasi instance Axios dengan URL dasar ke API backend
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  // Menambahkan header default jika diperlukan, misal untuk content type
  headers: {
    'Content-Type': 'application/json',
  },
});

// Anda bisa menambahkan interceptor untuk menyisipkan token secara otomatis
// Penting: Di lingkungan produksi, token biasanya diambil dari sistem otentikasi (misalnya Vuex store, Pinia, atau JWT di Local Storage)
// dan harus dikirim sebagai Bearer Token, bukan 'x-user-id'
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken'); // Contoh: Ambil JWT token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Standar JWT
  }
  // Jika Anda tetap ingin 'x-user-id' (misalnya untuk development/spesifik), bisa ditambahkan juga
  const userId = localStorage.getItem('user_id');
  if (userId && !config.headers['x-user-id']) { // Hindari duplikasi jika sudah diatur manual
    config.headers['x-user-id'] = userId;
  }
  return config;
}, error => {
  return Promise.reject(error);
});


export default {
  // === Articles ===
  getArticles() {
    // Menggunakan endpoint '/articles'
    return apiClient.get('/articles');
  },
  getArticle(slug) { // Mengubah parameter dari 'id' menjadi 'slug' agar sesuai dengan router
    // Menggunakan endpoint '/articles/:slug'
    return apiClient.get(`/articles/${slug}`);
  },
  createArticle(articleData) { // userId bisa diambil dari interceptor atau konteks otentikasi
    // Asumsi userId sudah disisipkan oleh interceptor request
    return apiClient.post('/articles', articleData);
  },
  // Jika perlu update/delete:
  // updateArticle(slug, articleData) {
  //   return apiClient.put(`/articles/${slug}`, articleData);
  // },
  // deleteArticle(slug) {
  //   return apiClient.delete(`/articles/${slug}`);
  // },

  // === Categories ===
  getCategories() {
    return apiClient.get('/categories');
  },

  // === Services / Treatments (Layanan) - BARU DITAMBAHKAN/BENAHI ===
  getServices() {
    // Asumsi endpoint untuk daftar semua layanan
    return apiClient.get('/services'); // Atau '/layanan' sesuai API backend Anda
  },
  getService(slug) { // Menggunakan 'slug' karena rute Anda menggunakan '/layanan/:slug'
    // Asumsi endpoint untuk detail layanan
    return apiClient.get(`/services/${slug}`); // Atau '/layanan/${slug}' sesuai API backend Anda
  },
  // Jika perlu menambahkan layanan baru
  // createService(serviceData) {
  //   return apiClient.post('/services', serviceData);
  // },


  // === Forum (Tanya Bidan) ===
  getAllQuestions() {
    return apiClient.get('/tanya-bidan');
  },
  getQuestionById(id) { // Parameter tetap 'id' jika backend Anda menggunakan ID numerik untuk pertanyaan
    return apiClient.get(`/tanya-bidan/${id}`);
  },
  createQuestion(questionData) {
    // Asumsi userId (jika perlu otentikasi) sudah disisipkan oleh interceptor
    return apiClient.post('/tanya-bidan', questionData);
  },
  createAnswer(questionId, answerData) {
    // Asumsi userId (jika perlu otentikasi) sudah disisipkan oleh interceptor
    return apiClient.post(`/tanya-bidan/${questionId}/answers`, answerData);
  },

  // === Consultations ===
  submitConsultation(consultationData) {
    return apiClient.post('/consultations', consultationData);
  },
  // getConsultations() { /* ... */ },

  // === Reservations ===
  submitReservation(reservationData) {
    return apiClient.post('/reservations', reservationData);
  },
  // getReservations() { /* ... */ },

  // === Testimonials ===
  getTestimonials() {
    return apiClient.get('/testimonials');
  },

  // === Categories ===
   getCategories() {
    return apiClient.get('/categories');
  },
  // createTestimonial(testimonialData) { /* ... */ },
};