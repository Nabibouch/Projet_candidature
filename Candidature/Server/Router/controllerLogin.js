
import { Login } from "../models/modelLogin.js";

// Inscription
export const inscription =  async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await Login.create ({email, password});
        res.status(201).json({message: 'Utilisateur crée'});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

// Connexion
export const connexion = async (req, res) => {
        const { email, password } = req.body;

        const user = await Login.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json("ça marche pas lol");
    }
    // req.session.userId = Login._id;
    res.json({ message: 'Connexion reussie' });
};

// Deconnexion
export const deconnexion =  (req, res) => {
try {
    res.json({messsage: 'Deconnexion reussie'});
} catch (error) {
    res.status(500).json({error:error.message});
}
