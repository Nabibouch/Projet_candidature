import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './AjoutCandidat/index.css'
import './Candidature/index.css'
import './Connexion/index.css'
import './Inscription/index.css'
import Candidature from './Candidature/candidature.jsx'
import Homepage from './Inscription/homepage.jsx'
import App from './AjoutCandidat/Ajout.jsx'
import Connect from './Connexion/connect.jsx'
import Modification from './Modification/modify.jsx'


const Slice = () =>{
  return (
    <Router>       
        <Routes>
          <Route path="/AjoutCandidat/:id" element ={<App />} />
          <Route path="/Connexion" element ={<Connect />} />
          <Route path="/Candidature" element ={<Candidature />} />
          <Route path="/Inscription" element ={<Homepage />} />
          <Route path="/modification/:id" element ={<Modification />} />
          <Route path="/" exact element ={<Connect />}/>
        </Routes>
    </Router>
  );
}

export default Slice;