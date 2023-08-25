const express = require('express');
const sequelize = require('./config/database');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const authRoutes = require('./routes/authRoutes');


const User = require('./models/User');
const RestaurantTable = require('./models/RestaurantTable');
const Reservation = require('./models/Reservation');
const Menu = require('./models/Menu');
const ReservationMenu = require('./models/ReservationMenu');

// Import des routes 
const userRoutes = require('./routes/users'); 
const menuRoutes = require('./routes/menus');
const reservationRoutes = require('./routes/reservations');
const restaurantTableRoutes = require('./routes/restaurantTables');
const reservationMenuRoutes = require('./routes/reservationMenus');
const homeRoutes = require('./routes/home');

// Importation des middlewares
const authMiddleware = require('./middlewares/authMiddleware');
const authorizationMiddleware = (req, res, next) => {
    if (!req.userId) {
        return res.status(403).json({ error: 'Access denied' });
    }
    User.findByPk(req.userId).then(user => {
        if (user && user.Role) {
            return next();
        } else {
            return res.status(403).json({ error: 'Access denied' });
        }
    }).catch(err => {
        return res.status(500).json({ error: 'Internal server error' });
    });
};

const app = express();

// Authentification
app.use('/auth', authRoutes);

// Utilisation des middlewares intégrés d'Express pour le traitement du corps des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utilisation de Twig pour les vues
app.set('view engine', 'twig');
app.set('views', __dirname + '/views');

// Route de test
// app.get('/', (req, res) => {
//     res.send('Bienvenue sur votre API de réservation pour restaurant!');
// });

// Utilisation des routes pour User, Menu, Reservation, restaurantTables, ReservationMenu
app.use('/users', authMiddleware, userRoutes); 
app.use('/menus', authMiddleware, menuRoutes); 
app.use('/reservations', authMiddleware, reservationRoutes);
app.use('/restaurantTables', authMiddleware, restaurantTableRoutes);
app.use('/reservationMenus', authMiddleware, reservationMenuRoutes);
app.use('/', homeRoutes);

//Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));




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
