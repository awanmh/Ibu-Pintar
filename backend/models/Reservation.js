// models/Reservation.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reservation = sequelize.define('Reservation', {
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
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  service_type: {
    type: DataTypes.ENUM('yoga_prenatal', 'pijat_bayi'),
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY, // Hanya menyimpan tanggal (YYYY-MM-DD)
    allowNull: false
  },
  time: {
    type: DataTypes.TIME, // Hanya menyimpan waktu (HH:MM:SS)
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'canceled'),
    defaultValue: 'pending'
  }
});

module.exports = Reservation;