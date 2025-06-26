// routes/articleRoutes.js
const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// --- Rute Publik ---
// Mendapatkan semua artikel
router.get('/', articleController.getAllArticles);

// Mendapatkan satu artikel spesifik berdasarkan ID
router.get('/:id', articleController.getArticleById);


// --- Rute Khusus Admin ---
// Membuat artikel baru
router.post('/', protect, isAdmin, articleController.createArticle);

// Mengupdate artikel berdasarkan ID
router.put('/:id', protect, isAdmin, articleController.updateArticle);

// Menghapus artikel berdasarkan ID
router.delete('/:id', protect, isAdmin, articleController.deleteArticle);


module.exports = router;