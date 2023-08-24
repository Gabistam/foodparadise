const express = require('express');
const sequelize = require('./config/database');

const Client = require('./models/Client');
const TableResto = require('./models/TableResto');
const Reservation = require('./models/Reservation');
const Menu = require('./models/Menu');
const ReservationMenu = require('./models/ReservationMenu');
// Import des routes pour Client, Menu, Reservation, TableResto, ReservationMenu
const clientRoutes = require('./routes/clients'); 
const menuRoutes = require('./routes/menus');
const reservationRoutes = require('./routes/reservations');
const tableRestoRoutes = require('./routes/tableRestos');
const reservationMenuRoutes = require('./routes/reservationMenus');

const app = express();

// Utilisation des middlewares intégrés d'Express pour le traitement du corps des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Bienvenue sur votre API de réservation pour restaurant!');
});
// Utilisation des routes pour Client, Menu, Reservation, TableResto, ReservationMenu
app.use('/clients', clientRoutes); 
app.use('/menus', menuRoutes); 
app.use('/reservations', reservationRoutes);
app.use('/tableRestos', tableRestoRoutes);
app.use('/reservationMenus', reservationMenuRoutes);



// Test de la connexion à la base de données
sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données établie avec succès.');
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données :', err);
    });

// Synchronisation des modèles avec la base de données
sequelize.sync()
    .then(() => {
        console.log("Les modèles ont été synchronisés avec succès !");
    })
    .catch(err => {
        console.error("Erreur lors de la synchronisation des modèles :", err);
    });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Le serveur est en écoute sur le port ${PORT}`);
});
