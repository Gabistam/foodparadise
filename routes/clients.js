const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// Récupérer tous les clients
router.get('/', async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Récupérer un client par ID
router.get('/:id', async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (client) {
            res.json(client);
        } else {
            res.status(404).json({ error: 'Client non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Créer un nouveau client
router.post('/', async (req, res) => {
    try {
        const client = await Client.create(req.body);
        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mettre à jour un client par ID
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Client.update(req.body, {
            where: { ID_Client: req.params.id }
        });
        if (updated) {
            const updatedClient = await Client.findByPk(req.params.id);
            res.status(200).json(updatedClient);
        } else {
            res.status(404).json({ error: 'Client non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Supprimer un client par ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Client.destroy({
            where: { ID_Client: req.params.id }
        });
        if (deleted) {
            res.status(204).send("Client supprimé");
        } else {
            res.status(404).json({ error: 'Client non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
