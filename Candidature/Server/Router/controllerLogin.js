
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
    try{
        const { email, password } = req.body;
        const user = await Login.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json("ça marche pas lol");
        }

        res.cookie("userId", user._id, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ message: 'Connexion reussie'});
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Session et Cookies
export const session = async (req, res) => {
    try {
        const userId = req.cookie.userId;
        if (!userId) {
            return res.status(500).json({error: error.message})
        }
        const user = await Login.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: error.message});
        }
        res.json({ message: "Utilisateur authentifié", user });
    } catch (error) {
        res.status(500).json({error: message.error})
    }
};

// Deconnexion
export const deconnexion =  (req, res) => {
try {
    res.clearCookie("user_id")
    res.json({messsage: 'Deconnexion reussie'});
} catch (error) {
    res.status(500).json({error:error.message});    
    }
};
