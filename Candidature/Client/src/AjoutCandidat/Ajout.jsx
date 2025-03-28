import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import axios from "axios";
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; // Import des icônes

const App = () => {
  const [candidature, setCandidature] = useState([]);

  useEffect(() => {
    const fetchpost = async () => {
      try {
        const response = await axios.get("http://localhost:3000/candidature/recupCandidatures");
        console.log(response.data);
        setCandidature(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchpost();
  }, []);

  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate('/Candidature');
  };

  const handleMenuClick = () => {
    navigate('/AjoutCandidat');
  };

  const handleDeconnexionClick = () => {
    navigate('/Connexion');
  };

  const handleModifyClick = () => {
    navigate('/Modification');
  };

  const handleDelete = (id) => {
    // Ajoute la logique pour supprimer la candidature ici
  };

  return (
    <div>
      <header>
        <div className="logo">NCIA</div>
        <nav>
          <ul>
            <li><a href="#" onClick={handleMenuClick}>Menu</a></li>
            <li><a href="#" onClick={handleDeconnexionClick}>Déconnexion</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="upload-box">
          <div className="aplication-in-progress">
            <div className="table-header">
              <span>Entreprise</span>
              <span>Poste</span>
              <span>Plateforme</span>
              <span>Date</span>
              <span>Actions</span>
            </div>
            {candidature.map((item) => (
              <div className="apply" key={item._id}>
                <span>{item.company}</span>
                <span>{item.post}</span>
                <a href={item.link}>Plateforme de candidature</a>
                <span>{item.date}</span>
                <div className="action-buttons">
                  <button 
                    className="edit-button" 
                    onClick={() => handleModifyClick(item._id)} 
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDelete(item._id)} 
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="upload-file">
            <label htmlFor="peas" className="upload-label">
              <span className="plus-icon" onClick={handleIconClick}>+</span>
              Ajouter une candidature
            </label>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
