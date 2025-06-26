const { Question, Answer, User } = require('../models');

// Mengambil semua pertanyaan
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll({
      include: { model: User, as: 'asker', attributes: ['name'] },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil pertanyaan.', error: error.message });
  }
};

// Mengambil satu pertanyaan dengan semua jawabannya
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id, {
      include: [
        { model: User, as: 'asker', attributes: ['name'] },
        {
          model: Answer,
          include: { model: User, as: 'author', attributes: ['name', 'role'] }
        }
      ],
      order: [[Answer, 'createdAt', 'ASC']]
    });
    if (!question) {
      return res.status(404).json({ message: 'Pertanyaan tidak ditemukan.' });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil detail pertanyaan.', error: error.message });
  }
};

// Membuat pertanyaan baru
exports.createQuestion = async (req, res) => {
  try {
    const { title, content, user_id } = req.body; // Di aplikasi nyata, user_id dari token
    const newQuestion = await Question.create({ title, content, user_id });
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat pertanyaan.', error: error.message });
  }
};

// Membuat jawaban baru
exports.createAnswer = async (req, res) => {
  try {
    const { content, user_id } = req.body; // Di aplikasi nyata, user_id dari token
    const question_id = req.params.id;
    const newAnswer = await Answer.create({ content, user_id, question_id });
    res.status(201).json(newAnswer);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengirim jawaban.', error: error.message });
  }
};