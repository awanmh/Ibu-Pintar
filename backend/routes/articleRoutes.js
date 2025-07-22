const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Route publik
router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);

// Route admin (butuh login dan role admin)
router.post('/', protect, isAdmin, articleController.createArticle);
router.put('/:id', protect, isAdmin, articleController.updateArticle);
router.delete('/:id', protect, isAdmin, articleController.deleteArticle);

module.exports = router;
