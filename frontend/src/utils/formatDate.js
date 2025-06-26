// src/utils/formatDate.js

/**
 * Mengubah string tanggal (misal: dari database) menjadi format yang mudah dibaca.
 * @param {string} dateString - String tanggal yang valid (e.g., "2025-06-15T10:00:00.000Z")
 * @returns {string} - Tanggal yang sudah diformat (e.g., "15 Juni 2025")
 */
export function formatDate(dateString) {
  if (!dateString) return ''; // Kembalikan string kosong jika input tidak ada

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  
  return date.toLocaleDateString('id-ID', options);
}