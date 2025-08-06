// frontend/src/services/StorageService.js

const StorageService = {
  set(key, value) {
    if (value === undefined || value === null) {
      localStorage.removeItem(key);
    } else {
      try {
        // PERBAIKAN: Jika key adalah 'token', simpan sebagai string biasa.
        // Jika tidak, simpan sebagai JSON.
        if (key === 'token') {
          localStorage.setItem(key, value);
        } else {
          localStorage.setItem(key, JSON.stringify(value));
        }
      } catch (e) {
        console.warn(`Failed to save ${key} to localStorage`, e);
      }
    }
  },

  get(key) {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      // PERBAIKAN: Jika key adalah 'token', kembalikan sebagai string biasa.
      // Jika tidak, parse sebagai JSON.
      if (key === 'token') {
        return item;
      }
      
      // Pengecekan 'undefined' string untuk data lama yang mungkin masih ada
      if (item === 'undefined') return null;

      return JSON.parse(item);
    } catch (e) {
      console.warn(`Failed to parse ${key} from localStorage`, e);
      // Jika gagal parse, coba kembalikan sebagai string biasa (untuk token lama yang mungkin tersimpan salah)
      if (key === 'token') {
        return localStorage.getItem(key);
      }
      return null;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },
};

export default StorageService;
