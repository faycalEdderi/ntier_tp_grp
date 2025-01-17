const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require('cors');
require("dotenv").config();
 
const app = express();


app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

app.use(cors({ origin: "*" }));

app.use("/gateway/health", (req, res) => {
  res.status(200).send({ message: "Gateway is running" });
});

// Mapping des microservices
const serviceMap = {
  users: "http://localhost:4000/users",
  products: "http://localhost:5000/products",
  health: "http://localhost:7000/health",
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