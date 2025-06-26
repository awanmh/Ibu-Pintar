
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Answer = sequelize.define('Answer', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  // user_id dan question_id akan ditambahkan via relasi
});

module.exports = Answer;