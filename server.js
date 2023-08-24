const express = require('express');
const sequelize = require('./config/database'); // Assurez-vous d'avoir un fichier de configuration de base de données approprié

const app = express();

// Middlewares
app.use(express.json()); // Pour parser le JSON

// Routes (Ajout de plus de routes plus tard)
app.get('/', (req, res) => {
    res.send('Bienvenue sur FoodParadise!');
});

// Connexion à la base de données et démarrage du serveur
const PORT = process.env.PORT || 3000;

sequelize.sync() // Synchronise les modèles avec la base de données
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
