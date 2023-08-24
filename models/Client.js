const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Client = sequelize.define('Client', {
    ID_Client: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Phone: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    // Options du modèle
    tableName: 'Client',  // Nom exact de la table dans la base de données
    timestamps: true    // Présence de champs createdAt/updatedAt
});

module.exports = Client;
