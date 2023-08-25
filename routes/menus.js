const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');  // Ajustez le chemin si nécessaire

// Récupérer tous les menus
router.get('/', async (req, res) => {
    try {
        const menus = await Menu.findAll();
        res.json(menus);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Récupérer un menu par ID
router.get('/:id', async (req, res) => {
    try {
        const menu = await Menu.findByPk(req.params.id);
        if (menu) {
            res.json(menu);
        } else {
            res.status(404).json({ message: 'Menu non trouvé' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Créer un nouveau menu
router.post('/', async (req, res) => {
    try {
        const newMenu = await Menu.create(req.body);
        res.status(201).json(newMenu);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Mettre à jour un menu
router.put('/:id', async (req, res) => {
    try {
        const menu = await Menu.findByPk(req.params.id);
        if (menu) {
            await menu.update(req.body);
            res.json({ message: 'Menu mis à jour' });
        } else {
            res.status(404).json({ message: 'Menu non trouvé' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Supprimer un menu
router.delete('/:id', async (req, res) => {
    try {
        const menu = await Menu.findByPk(req.params.id);
        if (menu) {
            await menu.destroy();
            res.json({ message: 'Menu supprimé' });
        } else {
            res.status(404).json({ message: 'Menu non trouvé' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
