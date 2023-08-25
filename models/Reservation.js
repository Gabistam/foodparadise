// models/reservation.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Reservation extends Model {}

Reservation.init({
    ReservationID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'UserID'
        }
    },
    TableID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'RestaurantTables',
            key: 'TableID'
        }
    },
    ReservationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    ReservationTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    NumberOfPeople: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'Reservation',
    timestamps: true
});

module.exports = Reservation;
