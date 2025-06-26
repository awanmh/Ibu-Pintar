// middleware/authMiddleware.js
const { User } = require('../models');

/**
 * Middleware untuk memproteksi rute.
 * Mensimulasikan pengecekan token otentikasi.
 * Di aplikasi nyata, ini akan memverifikasi JWT.
 * * Cara kerja simulasi: Client harus mengirim header 'x-user-id' berisi ID user.
 */
exports.protect = async (req, res, next) => {
  try {
    const userId = req.header('x-user-id');

    if (!userId) {
      // 401 Unauthorized - Tidak ada identitas yang diberikan
      return res.status(401).json({ message: "Akses ditolak. Tidak ada user ID yang diberikan di header 'x-user-id'." });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      // 401 Unauthorized - Identitas yang diberikan tidak valid
      return res.status(401).json({ message: "Akses ditolak. User tidak ditemukan." });
    }

    // Lampirkan data user ke object request agar bisa digunakan di controller selanjutnya
    req.user = user;
    next(); // Lanjutkan ke middleware atau controller berikutnya
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server saat otentikasi.", error: error.message });
  }
};

/**
 * Middleware untuk mengecek apakah user yang login adalah admin.
 * Middleware ini HARUS dijalankan SETELAH middleware 'protect'.
 */
exports.isAdmin = (req, res, next) => {
  // req.user sudah dilampirkan dari middleware 'protect'
  if (req.user && req.user.role === 'admin') {
    next(); // User adalah admin, lanjutkan
  } else {
    // 403 Forbidden - User terotentikasi tapi tidak punya hak akses
    res.status(403).json({ message: "Akses ditolak. Rute ini hanya untuk admin." });
  }
};