import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import de useNavigate pour la redirection
import './index.css';  

const Connect = () => {
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleMotDePasseChange = (e) => {
        setMotDePasse(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();  

        if (!email || !motDePasse) {
            setError('Tous les champs doivent être remplis.');
            return;
        }

        setError('');


        console.log('Utilisateur connecté', { email, motDePasse });

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
                                value={email} 
                                onChange={handleEmailChange} 
                                required 
                            />
                        </div>

                        <div className="input-group">
                            <input 
                                type="password" 
                                placeholder="Mot de passe*" 
                                value={motDePasse} 
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
