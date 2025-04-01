import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './index.css';  
import axios from 'axios';
import toast from 'react-hot-toast';

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

    const handleConnexionClick = () => {
        navigate('/Connexion');
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if(!email || !password){
            setError('Tous les champs doivent être remplis');
            toast.error(error);
            return;
        }

        try {
            const result = await axios.post("http://localhost:3000/candidature/register", {email, password})
            if (result.data.error) {
                toast.error(result.data.error)
            }

        
            if (!email || !password) {
                setError('Tous les champs doivent être remplis.');
                return;
            }

            setError('');

            const { data } = await axios.get(`http://localhost:3000/candidature/user?email=${email}`);
            const userId = data._id;

            navigate(`/AjoutCandidat/${userId}`);
        }catch(error){
            console.log(error);
            toast.error("Une erreur est survenue lors de l'inscription");
        }
    };

    return (
        <div>
            <header>
                <div className="logo">NCIA</div>
                <nav>
                    <ul>
                        <li><a href="#" onClick={handleConnexionClick}>Connexion</a></li>
                    </ul>
                </nav>
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
