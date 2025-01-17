import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Status.css";

const StatusPage = () => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await axios.get("http://localhost:7000/health/status");
        setStatuses(response.data);
      } catch (err) {
        setError("Erreur lors de la récupération des statuts.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatuses();
  }, []);

  if (loading) {
    return <p className="status-loading">Chargement des statuts...</p>;
  }

  if (error) {
    return <p className="status-error">{error}</p>;
  }

  return (
    <div className="status-page">
      <h1>Statut des Microservices</h1>
      <table className="status-table">
        <thead>
          <tr>
            <th>Nom du Service</th>
            <th>Statut</th>
            <th>Détails</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map((service, index) => (
            <tr key={index}>
              <td>{service.name}</td>
              <td className={service.status === "up" ? "status-up" : "status-down"}>
                {service.status === "up" ? "En ligne" : "Hors ligne"}
              </td>
              <td>{service.data ? service.data.message : service.name+" is not running. Sorry for the inconvenience"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatusPage;
