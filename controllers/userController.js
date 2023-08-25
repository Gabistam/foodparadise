const { Users } = require('../models/User');  // Supposant que vous avez un dossier 'models' avec des modèles Sequelize
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Fonction pour inscrire un nouvel utilisateur
exports.signup = async (req, res) => {
    try {
        // Vérifier si l'email existe déjà
        const existingUser = await Users.findOne({ where: { Email: req.body.Email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email déjà existant' });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(req.body.Password, 10);

        // Créer l'utilisateur
        const user = await Users.create({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            PhoneNumber: req.body.PhoneNumber,
            Password: hashedPassword  // En supposant que vous ajoutiez un champ Password à la table Users
        });

        res.status(201).json({ message: 'Utilisateur enregistré avec succès', userId: user.UserID });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fonction pour connecter un utilisateur
exports.signin = async (req, res) => {
    try {
        // Trouver un utilisateur par email
        const user = await Users.findOne({ where: { Email: req.body.Email } });
        if (!user) {
            return res.status(400).json({ error: 'Email ou mot de passe invalide' });
        }

        // Vérifier le mot de passe
        const validPassword = await bcrypt.compare(req.body.Password, user.Password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Email ou mot de passe invalide' });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user.UserID }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ... (Vous pouvez ajouter d'autres fonctions liées à l'authentification des utilisateurs si nécessaire)
