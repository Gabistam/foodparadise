const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Route d'inscription
router.post('/signup', async (req, res) => {
    try {
        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Création de l'utilisateur (à intégrer avec votre logique de base de données)
        const user = await UserController.create({
            ...req.body,
            password: hashedPassword
        });

        // Génération d'un token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route de connexion
router.post('/signin', async (req, res) => {
    try {
        // Vérification de l'utilisateur (à intégrer avec votre logique de base de données)
        const user = await UserController.findByEmail(req.body.email);
        if (!user) {
            return res.status(400).json({ error: 'Email or password is wrong' });
        }

        // Vérification du mot de passe
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Email or password is wrong' });
        }

        // Génération d'un token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route de deconnexion
router.post('/signout', async (req, res) => {
    try {
        // Vérification de l'utilisateur (à intégrer avec votre logique de base de données)
        const user = await UserController.findByEmail(req.body.email);
        if (!user) {
            return res.status(400).json({ error: 'Email or password is wrong' });
        }

        // Génération d'un token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route de réinitialisation du mot de passe
router.post('/reset-password', async (req, res) => {
    try {
        // Vérification de l'utilisateur (à intégrer avec votre logique de base de données)
        const user = await UserController.findByEmail(req.body.email);
        if (!user) {
            return res.status(400).json({ error: 'Email or password is wrong' });
        }

        // Génération d'un token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
