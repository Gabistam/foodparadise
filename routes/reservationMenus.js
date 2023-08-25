const express = require('express');
const router = express.Router();
const ReservationMenu = require('../models/ReservationMenu');  // Ajustez le chemin si nécessaire

// Récupérer toutes les associations Reservation-Menu
router.get('/', async (req, res) => {
    try {
        const associations = await ReservationMenu.findAll();
        res.json(associations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ajouter une nouvelle association Reservation-Menu
router.post('/', async (req, res) => {
    try {
        const newAssociation = await ReservationMenu.create(req.body);
        res.status(201).json(newAssociation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Supprimer une association Reservation-Menu
router.delete('/:reservationId/:menuId', async (req, res) => {
    try {
        const association = await ReservationMenu.findOne({
            where: {
                ReservationID: req.params.reservationId,
                MenuID: req.params.menuId
            }
        });
        if (association) {
            await association.destroy();
            res.json({ message: 'Association supprimée' });
        } else {
            res.status(404).json({ message: 'Association non trouvée' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
