const express = require('express');
const router = express.Router();
const TableResto = require('../models/TableResto'); // Import du modèle TableResto

// Récupérer toutes les tables
router.get('/', async (req, res) => {
    try {
        const tables = await TableResto.findAll();
        res.json(tables);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer une table par ID
router.get('/:id', async (req, res) => {
    try {
        const table = await TableResto.findByPk(req.params.id);
        if (table) {
            res.json(table);
        } else {
            res.status(404).json({ error: 'Table non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Créer une nouvelle table
router.post('/', async (req, res) => {
    try {
        const table = await TableResto.create(req.body);
        res.status(201).json(table);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour une table par ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await TableResto.update(req.body, {
            where: { ID_Table: req.params.id }
        });
        if (updated) {
            const updatedTable = await TableResto.findByPk(req.params.id);
            res.status(200).json(updatedTable);
        } else {
            res.status(404).json({ error: 'Table non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Supprimer une table par ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await TableResto.destroy({
            where: { ID_Table: req.params.id }
        });
        if (deleted) {
            res.status(204).send("Table supprimée");
        } else {
            res.status(404).json({ error: 'Table non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
