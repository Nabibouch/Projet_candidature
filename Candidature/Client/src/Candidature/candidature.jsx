import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import du hook useNavigate pour la redirection
import './index.css';  
import axios from 'axios';

const Candidature = () => {
    const [company, setCompany] = useState('');
    const [post, setPost] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [link, setlink] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const handleEntrepriseChange = (e) => setCompany(e.target.value);
    const handleOffreChange = (e) => setPost(e.target.value);
    const handleDateCandidatureChange = (e) => setDate(e.target.value);
    const handleStatutCandidatureChange = (e) => setStatus(e.target.value);
    const handlePlateformeCandidatureChange = (e) => setlink(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();  

        if (!company || !post || !date || !status|| !link) {
            setError('Tous les champs doivent être remplis.');
            return;
        }

        setError('');

        axios.post("http://localhost:3000/candidature/addCandidature", {company, post, link, status, date})
        .then((result) => (
            console.log(result)
        ))


        navigate('/AjoutCandidat');
    };
    const handleMenuClick = () => {
        navigate('/AjoutCandidat');
      };
    
      const handleDeconnexionClick = () => {
        navigate('/Connexion');
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
                <div className="form-container">
                    <h1>CANDIDATURE</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input 
                                type="text" 
                                placeholder="Entreprise*" 
                                name='company'
                                onChange={handleEntrepriseChange} 
                                required 
                            />
                            <input 
                                type="text" 
                                placeholder="Offre*" 
                                name='post' 
                                onChange={handleOffreChange} 
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <input 
                                type="date" 
                                placeholder="Date de candidature*" 
                                name='date'
                                onChange={handleDateCandidatureChange} 
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <input 
                                type="text" 
                                placeholder="Statut de candidature*" 
                                name='status'
                                onChange={handleStatutCandidatureChange} 
                                required 
                            />
                            <input 
                                type="url" 
                                placeholder="Lien*" 
                                name='link'
                                onChange={handlePlateformeCandidatureChange} 
                                required 
                            />
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Affichage des erreurs */}
                        <p>Les champs indiqués * sont obligatoires</p>
                        <button type="submit">Envoyer</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Candidature;
