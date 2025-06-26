const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
// const { protect } = require('../middleware/authMiddleware'); // Uncomment jika sudah ada login

// Rute Publik
router.get('/', forumController.getAllQuestions);
router.get('/:id', forumController.getQuestionById);

// Rute yang perlu login
router.post('/', forumController.createQuestion); // Diasumsikan perlu login
router.post('/:id/answers', forumController.createAnswer); // Diasumsikan perlu login

module.exports = router;