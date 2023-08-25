const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');  // Ajustez le chemin si nécessaire
//ajout middleware auth
// const authMiddleware = require('../middlewares/authMiddleware');


// Récupérer toutes les réservations
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Récupérer une réservation par ID
router.get('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (reservation) {
            res.json(reservation);
        } else {
            res.status(404).json({ message: 'Réservation non trouvée' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Créer une nouvelle réservation
router.post('/', async (req, res) => {
    try {
        const newReservation = await Reservation.create(req.body);
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Mettre à jour une réservation
router.put('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (reservation) {
            await reservation.update(req.body);
            res.json({ message: 'Réservation mise à jour' });
        } else {
            res.status(404).json({ message: 'Réservation non trouvée' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Supprimer une réservation
router.delete('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (reservation) {
            await reservation.destroy();
            res.json({ message: 'Réservation supprimée' });
        } else {
            res.status(404).json({ message: 'Réservation non trouvée' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
