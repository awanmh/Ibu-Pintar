// src/store/index.js
import { createStore } from 'vuex';
import articles from './modules/articles';
import auth from './modules/auth'; // <-- Impor modul baru

export default createStore({
  modules: {
    articles,
    auth, // <-- Daftarkan di sini
  },
});
