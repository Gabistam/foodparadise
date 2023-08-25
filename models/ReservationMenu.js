// models/reservationMenu.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ReservationMenu extends Model {}

ReservationMenu.init({
    ReservationID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Reservations',
            key: 'ReservationID'
        },
        primaryKey: true
    },
    MenuID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Menus',
            key: 'MenuID'
        },
        primaryKey: true
    }
}, {
    sequelize,
    tableName: 'ReservationMenu',
    timestamps: false
});

module.exports = ReservationMenu;
