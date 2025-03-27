import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './index.css';  
import axios from 'axios';

const Homepage = () => {
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
        axios.post("http://localhost:3000/candidature/register", {email, password})

    
        if (!email || !password) {
            setError('Tous les champs doivent être remplis.');
            return;
        }

        setError('');

        console.log('Formulaire soumis', { email, password });

        navigate('/AjoutCandidat');
    };

    return (
        <div>
            <header>
                <div className="logo">NCIA</div>
            </header>

            <main>
                <div className="form-container">
                    <h1>Inscription</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input 
                                type="email" 
                                placeholder="Email*"
                                name="email" 
                                // value={email} 
                                onChange={handleEmailChange} 
                                required 
                            />
                        </div>

                        <div className="input-group">
                            <input 
                                type="password" 
                                placeholder="Mot de passe*"
                                name="password" 
                                // value={password} 
                                onChange={handleMotDePasseChange} 
                                required 
                            />
                        </div>
                
                        {error && <p style={{ color: 'red' }}>{error}</p>} 
                        <button type="submit" name=''>Envoyer</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Homepage;
