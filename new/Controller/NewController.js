const News = require("../Models/New");

// Méthode pour créer une nouvelle actualité
const createNews = async (req, res) => {
  try {
    // Création d'une nouvelle instance de News avec les données reçues
    const news = new News({
      title: req.body.title,
      content: req.body.content,
    });

    // Sauvegarde dans la base de données
    const savedNews = await news.save();
    
    // Réponse avec le statut 201 (Created) et les données sauvegardées
    res.status(201).json(savedNews);
  } catch (error) {
    // En cas d'erreur, on renvoie un statut 400 avec le message d'erreur
    console.error("Erreur lors de la création:", error);
    res.status(400).json({ message: error.message });
  }
};

// Méthode pour récupérer toutes les actualités
const getAllNews = async (req, res) => {
  try {
    // Récupération de toutes les actualités
    const news = await News.find();
    
    // Réponse avec le statut 200 (OK) et les données
    res.status(200).json(news);
  } catch (error) {
    // En cas d'erreur, on renvoie un statut 500 avec le message d'erreur
    console.error("Erreur lors de la récupération:", error);
    res.status(500).json({ message: error.message });
  }
};

// Export des méthodes
module.exports = {
  createNews,
  getAllNews,
};