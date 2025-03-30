import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  
import './index.css';  
import axios from 'axios';

const Modification = () => {

    const [company, setEntreprise] = useState('');
    const [post, setOffre] = useState('');
    const [date, setDateCandidature] = useState('');
    const [status, setStatutCandidature] = useState('');
    const [link, setPlateformeCandidature] = useState('');
    const [error, setError] = useState('');
    const [oldData, setPlaceholder] =useState([]);
    
    const navigate = useNavigate();
    const candidature_id = useParams().id.replace(":", "");
    const userId = useParams().userId.replace(":", "");



    const handleEntrepriseChange = (e) => setEntreprise(e.target.value);
    const handleOffreChange = (e) => setOffre(e.target.value);
    const handleDateCandidatureChange = (e) => setDateCandidature(e.target.value);
    const handleStatutCandidatureChange = (e) => setStatutCandidature(e.target.value);
    const handlePlateformeCandidatureChange = (e) => setPlateformeCandidature(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();  

        // if (!company || !post || !date || !status || !link) {
        //     setError('Tous les champs doivent être remplis.');
        //     return;
        // }

        setError('');

        // J'ai adapté les noms de variables à mon code
        axios.put(`http://localhost:3000/candidature/majCandidature/${candidature_id}`, {
            company, 
            post, 
            link, 
            status,
            date,
            userId : userId
        })
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.error('Erreur lors de la soumission :', err);
        });

        navigate(`/AjoutCandidat/${userId}`);
    };

    const handleMenuClick = () => {
        navigate(`/AjoutCandidat/${userId}`);
    };
    
    const handleDeconnexionClick = () => {
        navigate('/Connexion');
    };

    useEffect(() => {
        const recupData = async () => {
            try {
            const response = await axios.get(`http://localhost:3000/candidature/recupCandidatureSpe/${candidature_id}`);
            console.log(response.data);
            setPlaceholder(response.data);
            setEntreprise(response.data.company);
            setOffre(response.data.post);
            setDateCandidature(response.data.date);
            setPlateformeCandidature(response.data.link);
            }catch (err) {
                console.log(err);
                
            }
            
        }
        recupData();
    },[]);
    
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
                                name="company"
                                defaultValue= {oldData.company}
                                onChange={handleEntrepriseChange} 
                            
                            />
                            <input 
                                type="text" 
                                name="post" 
                                defaultValue= {oldData.post}
                                onChange={handleOffreChange} 
                            
                            />
                        </div>
                        <div className="input-group">
                            <input 
                                type="date" 
                                name="date" 
                                defaultValue= {oldData.date} 
                                onChange={handleDateCandidatureChange} 
                             
                            />
                        </div>
                        <div className="input-group">
                            <select 
                                name="status"
                                onChange={handleStatutCandidatureChange} 
                            
                            >
                                <option value="">{oldData.status}</option>
                                <option value="Acceptée">Acceptée</option>
                                <option value="Refusée">Refusée</option>
                                <option value="En attente">En attente</option>
                            </select>
                            <input 
                                type="url" 
                                name="link" 
                                defaultValue= {oldData.link} 
                                onChange={handlePlateformeCandidatureChange} 
                            
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

export default Modification;
