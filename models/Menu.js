const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Menu = sequelize.define('Menu', {
    ID_Menu: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nom_Plat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.TEXT,
    },
    Prix: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
    }
}, {
    tableName: 'Menu',
    timestamps: false
});

module.exports = Menu;
