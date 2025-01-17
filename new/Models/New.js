const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
}, {
  // Ajoute automatiquement createdAt et updatedAt
  timestamps: true
});

// L'ID est automatiquement créé par MongoDB, pas besoin de le définir explicitement

const News = mongoose.model("News", newsSchema);

module.exports = News;