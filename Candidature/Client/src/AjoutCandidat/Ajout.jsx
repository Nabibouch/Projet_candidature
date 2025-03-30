import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import './index.css';
import axios from "axios";
import { FaTrashAlt, FaEdit } from 'react-icons/fa'; // Import des icônes 
import toast from 'react-hot-toast';

const App = () => {
  
  const [candidature, setCandidature] = useState([]);
  const [nbCandidatureAccepté, setNbCandidatureAccepté] = useState("");
  const [nbCandidatureRefusé, setNbCandidatureRefusé] = useState("");
  const [nbCandidatureEnAttente, setNbCandidatureEnAttente] = useState("");
  const [nbCandidature, setNbCandidature] = useState("");
  const [deadline, setDeadline] = useState("");
  
  const userId = useParams().id.replace(":","");
  
  useEffect(() => {
    
    const fetchpost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/candidature/dashboard?userId=${userId}`);
        setCandidature(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const nbcandidature = async (filtre, use_state) => {
      try {
        const response = await axios.get(`http://localhost:3000/candidature/compte?status=${filtre}`);
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

    

    


  }, []);


  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate(`/Candidature/${userId}`);
  };

  const handleMenuClick = () => {
    navigate(`/AjoutCandidat/${userId}`);
  };

  const handleDeconnexionClick = () => {
    navigate('/Connexion');
  };


    const handleDelete = (id) => {
    const routeDelete = "http://localhost:3000/candidature/deleteCandidature/" + id;

    setCandidature((prevCandidatures) => prevCandidatures.filter((item) => item._id !== id));
    

    // setNbCandidature( (prevValue) => prevValue.filter((item) => item._id !== id));
    // setNbCandidatureEnAttente( (prevValue) => prevValue.filter((item) => item._id !== id));
    // setNbCandidatureRefusé( (prevValue) => prevValue.filter((item) => item._id !== id));
    // setNbCandidatureAccepté( (prevValue) => prevValue.filter((item) => item._id !== id));

    toast.success("Candidature supprimée avec succès !");

    axios.delete(routeDelete);
  }

  
  

  const handleModifyClick = (id) => {
    navigate(`/Modification/${id}/${userId}`);
  }

  useEffect(() => {

    candidature.forEach((item) => {
    const today = new Date().toISOString().split('T')[0];
    if (item.date === today) {
      toast.error(`La candidature chez ${item.company} a besoin d'une relance !`);
    }
  });

  },[candidature])
  const getBackgroundColor = (item) => {
    const today = new Date().toISOString().split('T')[0];
    if (item.date === today) {
      
      return "#ca3743d5";
      
    } 

  return "#333";
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

      <main className='column'>
        <div className="upload-box">
          <div className="aplication-in-progress">
            <div className="table-header">
              <span>Entreprise</span>
              <span>Poste</span>
              <span>Plateforme</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            {candidature.map((item) => (
              <div className="apply" key={item._id} style={{ backgroundColor: getBackgroundColor(item) }} >
                <span>{item.company}</span>
                <span>{item.post}</span>
                <a href={item.link}>Plateforme de candidature</a>
                <span>{item.status}</span>
                <div className="action-buttons">
                  <button 
                    className="edit-button" 
                    onClick={() => handleModifyClick(item._id)} 
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
