// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  role: {
    type: DataTypes.ENUM('visitor', 'admin'),
    defaultValue: 'visitor'
  }
  // Di aplikasi nyata, tambahkan kolom password di sini
  // password: { type: DataTypes.STRING, allowNull: false }
}, {
  // Opsi untuk menonaktifkan kolom createdAt dan updatedAt jika tidak ada di SQL
  // Kita akan membiarkannya aktif karena ini praktik yang baik
  timestamps: true
});

module.exports = User;