// server.js

// 1. Impor semua modul yang dibutuhkan
require('dotenv').config(); // Paling pertama agar semua file bisa akses .env
const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./models'); // Impor dari models/index.js (Jantung Model & Relasi)
const mainRouter = require('./routes'); // Impor dari routes/index.js (Pusat Semua Rute)
const errorHandler = require('./middleware/errorMiddleware'); // Impor error handler

// 2. Inisialisasi aplikasi Express
const app = express();
const PORT = process.env.APP_PORT || 5000;

// 3. Pasang Middleware tingkat aplikasi (Application-level Middleware)
app.use(cors()); // Mengizinkan request dari frontend (origin yang berbeda)
app.use(express.json()); // Mem-parsing body request dengan format JSON
app.use(express.urlencoded({ extended: true })); // Mem-parsing body request dari form HTML

// 4. Pasang Rute Utama
// Semua rute yang kita definisikan akan memiliki awalan '/api'
// Contoh: /articles akan menjadi /api/articles
app.use('/api', mainRouter);
// 4A. Buat Rute untuk Upload
const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static('uploads'));

// 4B. Jadikan Folder 'uploads' Statis
// Ini agar gambar yang diupload bisa diakses dari browser
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// 5. Rute dasar untuk mengecek apakah server berjalan
app.get('/', (req, res) => {
  res.send('🎉 Selamat Datang di API Website Ibu Hamil! Server berjalan dengan baik.');
});

// 6. Pasang Error Handling Middleware
// PENTING: Ini harus dipasang SETELAH semua rute agar bisa menangkap error
app.use(errorHandler);

// 7. Fungsi untuk menjalankan server
const startServer = async () => {
  try {
    // ==========================================================
    // PERUBAHAN DI SINI: Opsi 'force: true' sudah dihapus.
    // Server sekarang tidak akan menghapus data Anda lagi.
    // ==========================================================
    await db.sequelize.sync(); 
    
    console.log("✅ Database berhasil tersinkronisasi.");

    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan dengan gagah di http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Gagal menyambungkan atau sinkronisasi database:", error);
  }
};

// 8. Jalankan server!
startServer();
