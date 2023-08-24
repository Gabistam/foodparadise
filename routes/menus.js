const express = require('express');
const router = express.Router();
const Menu = require('../models/menus'); // Import du modèle Menu

// Récupérer tous les menus
router.get('/', async (req, res) => {
    try {
        const menus = await Menu.findAll();
        res.json(menus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer un menu par ID
router.get('/:id', async (req, res) => {
    try {
        const menu = await Menu.findByPk(req.params.id);
        if (menu) {
            res.json(menu);
        } else {
            res.status(404).json({ error: 'Menu non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Créer un nouveau menu
router.post('/', async (req, res) => {
    try {
        const menu = await Menu.create(req.body);
        res.status(201).json(menu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour un menu par ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Menu.update(req.body, {
            where: { ID_Menu: req.params.id }
        });
        if (updated) {
            const updatedMenu = await Menu.findByPk(req.params.id);
            res.status(200).json(updatedMenu);
        } else {
            res.status(404).json({ error: 'Menu non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Supprimer un menu par ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Menu.destroy({
            where: { ID_Menu: req.params.id }
        });
        if (deleted) {
            res.status(204).send("Menu supprimé");
        } else {
            res.status(404).json({ error: 'Menu non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
