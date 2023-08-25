// models/menu.js
const { Model, DataTypes } = require('sequelize');

class Menu extends Model {}

Menu.init({
    MenuID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    DishName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.TEXT
    },
    Price: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'Menu',
    timestamps: false
});

module.exports = Menu;
