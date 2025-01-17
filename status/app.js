const express = require('express');
const healthRoutes = require('./Route/StatusRoute');
const cors = require('cors');

const app = express();
const PORT = 7000;

app.use(cors({ origin: "*" }));

// Middleware pour les routes
app.use('/health', healthRoutes);

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Une erreur interne est survenue.' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Service de status démarrée sur le port ${PORT}`);
});
