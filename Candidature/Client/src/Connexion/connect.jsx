import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './index.css';  
import axios from 'axios';

const Connect = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleMotDePasseChange = (e) => {
        setPassword(e.target.value);
    };

    const handleInscriptionClick = () => {
        navigate('/Inscription');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();  
        
        if (!email || !password) {
            setError('Tous les champs doivent être remplis.');
            return;
        }
        setError('');
        
        try {
            const auth  = await axios.post("http://localhost:3000/candidature/connexion", {email, password})
            
            if(auth == "ça marche pas lol") {
                setError("erreur authentification")
                return ;
            }

            const response = await axios.get(`http://localhost:3000/candidature/user?email=${email}`);
            const userId = response.data._id;
            
            if(userId) {
                navigate(`/AjoutCandidat/${userId}`);
            }
            else {
                setError("utilisateur introuvable")
            }

            
        } catch (error) {
            console.log(error);
        }


        
    };

    return (
        <div>
            <header>
                <div className="logo">NCIA</div>
                <nav>
                    <ul>
                        <li><a href="#" onClick={handleInscriptionClick}>Inscription</a></li>
                    </ul>
                </nav>
            </header>

            <main>
                <div className="form-container">
                    <h1>Connexion</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input 
                                type="email" 
                                placeholder="Email*" 
                                name='email'
                                onChange={handleEmailChange} 
                                required 
                            />
                        </div>

                        <div className="input-group">
                            <input 
                                type="password" 
                                placeholder="Mot de passe*" 
                                name='password'
                                onChange={handleMotDePasseChange} 
                                required 
                            />
                        </div>

                        {error && <p style={{ color: 'red' }}>{error}</p>} 
                        <button type="submit">Envoyer</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Connect;
