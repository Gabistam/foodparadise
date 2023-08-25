// Importation de la bibliothèque jsonwebtoken pour gérer les tokens JWT
const jwt = require('jsonwebtoken');

// Exportation d'un middleware pour vérifier le token JWT
module.exports = (req, res, next) => {
    // Récupération de l'en-tête 'authorization' de la requête
    const authHeader = req.headers.authorization;

    // Si l'en-tête 'authorization' est absent
    if (!authHeader) {
        // Renvoi d'une erreur 401 (non autorisé) indiquant que le token n'est pas fourni
        return res.status(401).json({ error: 'Token not provided' });
    }

    // Récupération du token JWT depuis l'en-tête 'authorization'
    // On suppose que l'en-tête est au format : Bearer <token>
    const token = authHeader.split(' ')[1];

    try {
        // Vérification du token avec la clé secrète JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attachement de l'ID de l'utilisateur (supposé être dans le token) à l'objet req
        req.userId = decoded.id;

        // Passage au prochain middleware ou routeur
        return next();
    } catch (err) {
        // Si une erreur se produit (token invalide ou expiré), renvoi d'une erreur 401
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};
