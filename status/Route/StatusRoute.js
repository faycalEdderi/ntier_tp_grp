const express = require('express');
const router = express.Router();

const { getAllStatuses, getServiceStatus } = require('../Controller/StatusController');

// Route pour récupérer le statut de tous les services
router.get('/status', getAllStatuses);

// Route pour récupérer le statut d'un service spécifique
router.get('/status/:serviceName', getServiceStatus);

module.exports = router;
