const express = require('express');
const sequelize = require('./config/database');

const User = require('./models/User');
const RestaurantTable = require('./models/RestaurantTable');
const Reservation = require('./models/Reservation');
const Menu = require('./models/Menu');
const ReservationMenu = require('./models/ReservationMenu');
// Import des routes pour User, Menu, Reservation, RestaurantTable, ReservationMenu
const userRoutes = require('./routes/users'); 
const menuRoutes = require('./routes/menus');
const reservationRoutes = require('./routes/reservations');
const restaurantTablesRoutes = require('./routes/restaurantTables');
const reservationMenuRoutes = require('./routes/reservationMenus');

const app = express();

// Utilisation des middlewares intégrés d'Express pour le traitement du corps des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utilisation de Twig pour les vues
app.set('view engine', 'twig');
app.set('views', __dirname + '/views');

// Routes
app.get('/', (req, res) => {
    res.send('Bienvenue sur votre API de réservation pour restaurant!');
});
// Utilisation des routes pour User, Menu, Reservation, restaurantTables, ReservationMenu
app.use('/users', userRoutes); 
app.use('/menus', menuRoutes); 
app.use('/reservations', reservationRoutes);
app.use('/restaurantTables', restaurantTableRoutes);
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
