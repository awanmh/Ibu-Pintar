// models/index.js
const sequelize = require('../config/database');
const Sequelize = require('sequelize');

// Impor semua model
const User = require('./User');
const Category = require('./Category');
const Article = require('./Article');
const Testimonial = require('./Testimonial');
const Consultation = require('./Consultation');
const Reservation = require('./Reservation');
const Question = require('./Question');
const Answer = require('./Answer');

// Buat objek database untuk menampung semua model
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Category = Category;
db.Article = Article;
db.Testimonial = Testimonial;
db.Consultation = Consultation;
db.Reservation = Reservation;
db.Question = Question;
db.Answer = Answer;

// Definisikan semua relasi/asosiasi antar tabel di sini
// Relasi User -> Article (Satu User bisa menulis banyak Artikel)
db.User.hasMany(db.Article, { foreignKey: 'author_id' });
db.Article.belongsTo(db.User, { as: 'author', foreignKey: 'author_id' });

// Relasi Category -> Article (Satu Kategori bisa memiliki banyak Artikel)
db.Category.hasMany(db.Article, { foreignKey: 'category_id' });
db.Article.belongsTo(db.Category, { as: 'category', foreignKey: 'category_id' });

// Relasi User -> Testimonial (Satu User bisa menulis banyak Testimonial)
db.User.hasMany(db.Testimonial, { foreignKey: 'user_id' });
db.Testimonial.belongsTo(db.User, { as: 'user', foreignKey: 'user_id' });

// Relasi User -> Question (Satu User bisa bertanya banyak)
db.User.hasMany(db.Question, { foreignKey: 'user_id' });
db.Question.belongsTo(db.User, { as: 'asker', foreignKey: 'user_id' });

// Relasi User -> Answer (Satu User bisa menjawab banyak)
db.User.hasMany(db.Answer, { foreignKey: 'user_id' });
db.Answer.belongsTo(db.User, { as: 'author', foreignKey: 'user_id' });

// Relasi Question -> Answer (Satu Pertanyaan punya banyak Jawaban)
db.Question.hasMany(db.Answer, { foreignKey: 'question_id' });
db.Answer.belongsTo(db.Question, { as: 'question', foreignKey: 'question_id' });

module.exports = db;