const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TableResto = sequelize.define('TableResto', {
    ID_Table: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Numero: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Capacite: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Emplacement: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'TableResto',
    timestamps: false
});

module.exports = TableResto;
