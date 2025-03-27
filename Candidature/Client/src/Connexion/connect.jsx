import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import de useNavigate pour la redirection
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

    const handleSubmit = (e) => {
        e.preventDefault();  
        
        if (!email || !password) {
            setError('Tous les champs doivent être remplis.');
            return;
        }
        setError('');
        
        axios.post("http://localhost:3000/candidature/connexion", {email, password})
        .then((result) => {
            console.log(result)
            if(result !== "ça marche pas lol") 
                navigate('/AjoutCandidat');
        })
    
        console.log('Utilisateur connecté', { email, password });

        navigate('/AjoutCandidat');
        
    };

    return (
        <div>
            <header>
                <div className="logo">NCIA</div>
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
