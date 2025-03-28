import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './index.css';
import axios from "axios";
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; // Import des icônes 

const App = () => {

  const [candidature, setCandidature] = useState([]);
  const [nbCandidatureAccepté, setNbCandidatureAccepté] = useState("");
  const [nbCandidatureRefusé, setNbCandidatureRefusé] = useState("");
  const [nbCandidatureEnAttente, setNbCandidatureEnAttente] = useState("");
  const [nbCandidature, setNbCandidature] = useState("");

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

    const nbcandidature = async (filtre, use_state) => {
      try {
        const response = await axios.get(`http://localhost:3000/candidature/compte?status=${filtre}`);
        console.log(response.data);
        use_state(response.data);
      } catch (error) {
        console.log(error);
        
      }
    }
    nbcandidature("En attente", setNbCandidatureEnAttente);
    nbcandidature("Refusée", setNbCandidatureRefusé);
    nbcandidature("Acceptée", setNbCandidatureAccepté);
    nbcandidature("", setNbCandidature);
    fetchpost();
  }, [candidature]);


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

  const handleDelete = (id) => {
    const routeDelete = "http://localhost:3000/candidature/deleteCandidature/" + id;

    axios.delete(routeDelete);
    navigate("/AjoutCandidat");
  }

  const handleEdit = (id) => {
    navigate(`/Modification/${id}`);
  }

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

      <main className='column'>
        <div className="upload-box">
          <div className='aplication-in-progress'>
            {candidature.map((item) => (
              <div className='apply' key={item._id}>
                <span>{item.company}</span>
                <span>{item.post}</span>
                <span>{item.status}</span>
                <span>{item.date}</span>
                <a href={item.link} target='blank'>lien</a>

                <div className="action-buttons">
                  <button 
                    className="edit-button" 
                    onClick={() => handleEdit(item._id)}  //faut ajouter la logique derrière
                  >
                    <FaEdit /> 
                  </button>
                  <button 
                    className="delete-button" 
                    onClick={() => handleDelete(item._id)} //faut ajouter la logique derrière
                  >
                    <FaTrashAlt /> 
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className='upload-file'>
            <label htmlFor="peas" className="upload-label">
              <span 
                className="plus-icon" 
                onClick={handleIconClick} 
              >
                +
              </span> 
              Ajouter une candidature
            </label>
          </div>
        </div>
        <div className='total-section'>
        <span>nombre de candidature : {nbCandidature.total} </span>
        <span>nombre de candidature en attente : {nbCandidatureEnAttente.total}</span>
        <span>nombre de candidature accepté : {nbCandidatureAccepté.total}</span>
        <span>nombre de candidature refusé : {nbCandidatureRefusé.total}</span>
        </div>
      </main>
    </div>
  );
};

export default App;
