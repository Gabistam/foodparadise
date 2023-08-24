const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservations'); // Import du modèle Reservation

// Récupérer toutes les réservations
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer une réservation par ID
router.get('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (reservation) {
            res.json(reservation);
        } else {
            res.status(404).json({ error: 'Réservation non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Créer une nouvelle réservation
router.post('/', async (req, res) => {
    try {
        const reservation = await Reservation.create(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour une réservation par ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Reservation.update(req.body, {
            where: { ID_Reservation: req.params.id }
        });
        if (updated) {
            const updatedReservation = await Reservation.findByPk(req.params.id);
            res.status(200).json(updatedReservation);
        } else {
            res.status(404).json({ error: 'Réservation non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Supprimer une réservation par ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Reservation.destroy({
            where: { ID_Reservation: req.params.id }
        });
        if (deleted) {
            res.status(204).send("Réservation supprimée");
        } else {
            res.status(404).json({ error: 'Réservation non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
