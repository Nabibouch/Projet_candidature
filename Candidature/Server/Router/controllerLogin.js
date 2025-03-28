import { Candidature } from "../models/modelLogin.js";

// Inscription
export const inscription =  async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await Candidature.create ({email, password});
        res.status(201).json({message: 'Utilisateur crée'});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

// Connexion
export const connexion = async (req, res) => {
        const { email, password } = req.body;
        const user = await Candidature.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: error.message });
    }
    req.session.userId = Candidature._id;
    res.json({ message: 'Connexion reussie' });
};

// Deconnexion
export const deconnexion =  (req, res) => {
try {
    res.json({messsage: 'Deconnexion reussie'});
} catch (error) {
    res.status(500).json({error:error.message});
}
}; 

// Session 
export const session = async (req, res) => {
    try {
        const user = await Candidature.findById(req.session.userId).select("-password");
        if (!user) {
            return res.status(404).json({error: "Utilisateurs non trouvé"});
        }
        res.json({message: "Utilisateur authentifié", user});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};