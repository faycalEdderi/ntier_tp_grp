import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Publication.css';

const AddPublication = () => {
  const [publication, setPublication] = useState({ title: "" });
  const [publications, setPublications] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/publications/getPublications');
      setPublications(response.data);
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la récupération des publications');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      if (isEditing) {
        await axios.put(
          `http://localhost:5000/publications/edit/${selectedPublication._id}`,
          { title: publication.title },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          }
        );
        alert(`Publication ${publication.title} modifiée avec succès`);
      } else {
        const response = await axios.post(
          'http://localhost:5000/publications/create',
          { title: publication.title },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          }
        );
        alert(`Publication ${response.data.title} créée avec succès`);
      }
      setPublication({ title: "" });
      setIsEditing(false);
      setSelectedPublication(null);
      fetchPublications(); // Refresh the list of publications
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la création ou de la modification de la publication');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      await axios.delete(`http://localhost:5000/publications/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      alert('Publication supprimée avec succès');
      fetchPublications(); // Refresh the list of publications
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la suppression de la publication');
    }
  };

  const handleSelect = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/publications/getPublication/${id}`);
      setSelectedPublication(response.data);
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la récupération de la publication');
    }
  };

  const handleEdit = (pub) => {
    setPublication({ title: pub.title });
    setSelectedPublication(pub);
    setIsEditing(true);
  };

  return (
    <div className="container">
      {selectedPublication && (
        <div>
          <h2>Détails de la publication</h2>
          <p>Titre: {selectedPublication.title}</p>
          <p>Date: {new Date(selectedPublication.date).toLocaleString()}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Titre'
          value={publication.title}
          onChange={(e) => setPublication({ ...publication, title: e.target.value })}
        />
        <button type='submit'>{isEditing ? 'Modifier' : 'Ajouter'}</button>
      </form>
      <h2>Liste des publications</h2>
      <ul>
        {publications.map((pub) => (
          <li key={pub._id}>
            {pub.title}
            <div>
              <button onClick={() => handleSelect(pub._id)}>Détails</button>
              <button onClick={(e) => { e.stopPropagation(); handleDelete(pub._id); }}>Supprimer</button>
              <button onClick={(e) => { e.stopPropagation(); handleEdit(pub); }}>Modifier</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddPublication;