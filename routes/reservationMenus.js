const express = require('express');
const router = express.Router();
const ReservationMenu = require('../models/ReservationMenu'); // Import du modèle ReservationMenu

// Récupérer toutes les associations réservation-menu
router.get('/', async (req, res) => {
    try {
        const reservationMenus = await ReservationMenu.findAll();
        res.json(reservationMenus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer une association réservation-menu par ID réservation et ID menu
router.get('/reservation/:resId/menu/:menuId', async (req, res) => {
    try {
        const reservationMenu = await ReservationMenu.findOne({
            where: { ID_Reservation: req.params.resId, ID_Menu: req.params.menuId }
        });
        if (reservationMenu) {
            res.json(reservationMenu);
        } else {
            res.status(404).json({ error: 'Association Réservation-Menu non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Créer une nouvelle association réservation-menu
router.post('/', async (req, res) => {
    try {
        const reservationMenu = await ReservationMenu.create(req.body);
        res.status(201).json(reservationMenu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Supprimer une association réservation-menu par ID réservation et ID menu
router.delete('/reservation/:resId/menu/:menuId', async (req, res) => {
    try {
        const deleted = await ReservationMenu.destroy({
            where: { ID_Reservation: req.params.resId, ID_Menu: req.params.menuId }
        });
        if (deleted) {
            res.status(204).send("Association Réservation-Menu supprimée");
        } else {
            res.status(404).json({ error: 'Association Réservation-Menu non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
