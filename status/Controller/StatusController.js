const axios = require('axios');

// Liste des microservices à surveiller
const services = [
  { name: 'users-service', url: 'http://localhost:3001/users/health', backup : 'http://localhost:4000/users/health' },
  { name: 'products-service', url: 'http://localhost:3001/products/health', backup : 'http://localhost:5000/products/health' },
  { name: 'gateway', url: 'http://localhost:3001/gateway/health', backup : 'http://localhost:3001/gateway/health' }
];



// Contrôleur pour récupérer les statuts de tous les services
const getAllStatuses = async (req, res) => {
  try {
    let gatewayResponse;
    try {
      gatewayResponse = await axios.get('http://localhost:3001/gateway/health');
    } catch (error) {
      gatewayResponse = false;
    }
    const statuses = await Promise.all(
      services.map(async (service) => {
        try {
          
          const url = gatewayResponse != false ? service.url : service.backup;
          const response = await axios.get(url);
          return { name: service.name, status: 'up', data: response.data };
        } catch (error) {
          return { name: service.name, status: 'down', error: error.message };
        }
      })
    );
    res.json(statuses);
  } catch (err) {
    console.log('error')
    res.status(500).json({ error: 'Erreur lors de la récupération des statuts.' });
  }
};

// Contrôleur pour récupérer le statut d'un service spécifique
const getServiceStatus = async (req, res) => {
  const { serviceName } = req.params;
  const service = services.find((s) => s.name.toLowerCase() === serviceName.toLowerCase());
  
  if (!service) {
    return res.status(404).json({ error: 'Service non trouvé' });
  }

  try {
    const response = await axios.get(service.url);
    res.json({ name: service.name, status: 'up', data: response.data });
  } catch (error) {
    res.json({ name: service.name, status: 'down', error: error.message });
  }
};

module.exports = { getAllStatuses, getServiceStatus };
