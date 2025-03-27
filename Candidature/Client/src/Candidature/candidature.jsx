import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import './index.css';  
import axios from 'axios';

const Candidature = () => {
    const [entreprise, setEntreprise] = useState('');
    const [offre, setOffre] = useState('');
    const [dateCandidature, setDateCandidature] = useState('');
    const [statutCandidature, setStatutCandidature] = useState('');
    const [plateformeCandidature, setPlateformeCandidature] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const handleEntrepriseChange = (e) => setEntreprise(e.target.value);
    const handleOffreChange = (e) => setOffre(e.target.value);
    const handleDateCandidatureChange = (e) => setDateCandidature(e.target.value);
    const handleStatutCandidatureChange = (e) => setStatutCandidature(e.target.value);
    const handlePlateformeCandidatureChange = (e) => setPlateformeCandidature(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();  

        if (!entreprise || !offre || !dateCandidature || !statutCandidature || !plateformeCandidature) {
            setError('Tous les champs doivent être remplis.');
            return;
        }

        setError('');

        // J'ai adapté les noms de variables à mon code
        axios.post("http://localhost:3000/candidature/addCandidature", {
            entreprise, 
            offre, 
            plateformeCandidature: plateformeCandidature, 
            statutCandidature: statutCandidature, 
            dateCandidature: dateCandidature
        })
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.error('Erreur lors de la soumission :', err);
        });

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
                                name="entreprise"
                                placeholder="Entreprise*" 
                                onChange={handleEntrepriseChange} 
                                required 
                            />
                            <input 
                                type="text" 
                                name="offre" 
                                placeholder="Offre*" 
                                onChange={handleOffreChange} 
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <input 
                                type="text" 
                                name="dateCandidature" 
                                placeholder="Date de candidature*" 
                                onChange={handleDateCandidatureChange} 
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <select 
                                name="statutCandidature"
                                value={statutCandidature} 
                                onChange={handleStatutCandidatureChange} 
                                required
                            >
                                <option value="">Statut de candidature*</option>
                                <option value="Acceptée">Acceptée</option>
                                <option value="Refusée">Refusée</option>
                                <option value="En attente">En attente</option>
                            </select>
                            <input 
                                type="url" 
                                name="plateformeCandidature" 
                                placeholder="Lien*" 
                                onChange={handlePlateformeCandidatureChange} 
                                required 
                            />
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}  
                        <p>Les champs indiqués * sont obligatoires</p>
                        <button type="submit">Envoyer</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Candidature;
