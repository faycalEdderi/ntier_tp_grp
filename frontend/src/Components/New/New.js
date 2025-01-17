import React, { useState, useEffect } from "react";
import axios from "axios";
import "./New.css";

const New = () => {
  const [news, setNews] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  // Récupérer toutes les actualités au chargement
  useEffect(() => {
    fetchNews();
  }, []);

  // Fonction pour récupérer les actualités
  const fetchNews = async () => {
    try {
      const response = await axios.get("http://localhost:3001/news");
      setNews(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des actualités:", error);
    }
  };

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/news", formData);
      setFormData({ title: "", content: "" }); // Réinitialiser le formulaire
      fetchNews(); // Rafraîchir la liste des actualités
    } catch (error) {
      console.error("Erreur lors de la création de l'actualité:", error);
    }
  };

  return (
    <div className="news-container">
      <div className="news-form-section">
        <h2>Ajouter une actualité</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Titre de l'actualité"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Contenu de l'actualité"
              required
            />
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>

      <div className="news-list-section">
        <h2>Liste des actualités</h2>
        <div className="news-grid">
          {news.map((item) => (
            <div key={item._id} className="news-card">
              <h3>{item.title}</h3>
              <p>{item.content}</p>
              <div className="news-date">
                {new Date(item.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default New;