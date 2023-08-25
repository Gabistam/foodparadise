// models/restaurantTable.js
const { Model, DataTypes } = require('sequelize');

class RestaurantTable extends Model {}

RestaurantTable.init({
    TableID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TableNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    LocationDescription: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    tableName: 'RestaurantTable',
    timestamps: false
});

module.exports = RestaurantTable;
