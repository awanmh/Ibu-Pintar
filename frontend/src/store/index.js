// src/store/index.js
import { createStore } from 'vuex';

// Impor modul-modul store Anda
import articles from './modules/articles';
// import user from './modules/user'; // contoh jika ada modul lain

export default createStore({
  // Daftarkan semua modul di sini
  modules: {
    articles,
    // user,
  },
});