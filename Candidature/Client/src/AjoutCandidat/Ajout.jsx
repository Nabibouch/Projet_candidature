import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './index.css';

const App = () => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate('/Candidature');  
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
        <div className="upload-box">
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
      </main>
    </div>
  );
};

export default App;
