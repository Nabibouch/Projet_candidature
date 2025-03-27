import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import './index.css';  

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
                                value={entreprise} 
                                onChange={handleEntrepriseChange} 
                                required 
                            />
                            <input 
                                type="text" 
                                placeholder="Offre*" 
                                value={offre} 
                                onChange={handleOffreChange} 
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <input 
                                type="text" 
                                placeholder="Date de candidature*" 
                                value={dateCandidature} 
                                onChange={handleDateCandidatureChange} 
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <select 
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
                                placeholder="Lien*" 
                                value={plateformeCandidature} 
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
