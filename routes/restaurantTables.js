const express = require('express');
const router = express.Router();
const RestaurantTable = require('../models/RestaurantTable');  // Ajustez le chemin si nécessaire

// Récupérer toutes les tables de restaurant
router.get('/', async (req, res) => {
    try {
        const tables = await RestaurantTable.findAll();
        res.json(tables);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Récupérer une table de restaurant par ID
router.get('/:id', async (req, res) => {
    try {
        const table = await RestaurantTable.findByPk(req.params.id);
        if (table) {
            res.json(table);
        } else {
            res.status(404).json({ message: 'Table non trouvée' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Créer une nouvelle table de restaurant
router.post('/', async (req, res) => {
    try {
        const newTable = await RestaurantTable.create(req.body);
        res.status(201).json(newTable);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Mettre à jour une table de restaurant
router.put('/:id', async (req, res) => {
    try {
        const table = await RestaurantTable.findByPk(req.params.id);
        if (table) {
            await table.update(req.body);
            res.json({ message: 'Table mise à jour' });
        } else {
            res.status(404).json({ message: 'Table non trouvée' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Supprimer une table de restaurant
router.delete('/:id', async (req, res) => {
    try {
        const table = await RestaurantTable.findByPk(req.params.id);
        if (table) {
            await table.destroy();
            res.json({ message: 'Table supprimée' });
        } else {
            res.status(404).json({ message: 'Table non trouvée' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
