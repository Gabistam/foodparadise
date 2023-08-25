const homeController = {};

// // Afficher la page d'accueil
homeController.getHome = (req, res) => {
    // Vous pouvez passer des données à votre vue si nécessaire
    res.render('pages/home', { title: 'Bienvenue dans notre restaurant Food Paradise' });
};


module.exports = homeController;
