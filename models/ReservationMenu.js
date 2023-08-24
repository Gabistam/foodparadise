const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ReservationMenu = sequelize.define('ReservationMenu', {
    ID_Reservation: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    ID_Menu: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    tableName: 'ReservationMenu',
    timestamps: false
});

module.exports = ReservationMenu;
