const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
 
const app = express();
 
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});
 
// Mapping des microservices
const serviceMap = {
  users: "http://localhost:4000/users",
  products: "http://localhost:5000/products",
  news: "http://localhost:8000/news",
};
 
// Middleware dynamique
app.use("/:service", (req, res, next) => {
  const serviceName = req.params.service;
  const target = serviceMap[serviceName];
  console.log(serviceName, target);
 
  if (target) {
    createProxyMiddleware({
      target,
      changeOrigin: true,
      logLevel: "debug",
    })(req, res, next);
  } else {
    res.status(502).send(`Service ${serviceName} non disponible.`);
  }
});
 
const PORT = process.env.GATEWAY_PORT || 3001;
app.listen(PORT, () => {
  console.log(`API Gateway démarrée sur le port ${PORT}`);
});