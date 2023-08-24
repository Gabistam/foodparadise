const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reservation = sequelize.define('Reservation', {
    ID_Reservation: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Heure: {
        type: DataTypes.TIME,
        allowNull: false
    },
    Nombre_Personnes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Statut: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Reservation',
    timestamps: true
});

module.exports = Reservation;
