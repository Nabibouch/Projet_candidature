
import { Login } from "../models/modelLogin.js";
import jwt from "jsonwebtoken";
import ENV from "../config/env.js";

// Inscription
export const inscription =  async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await Login.create ({email, password});
        res.status(201).json({message: 'Utilisateur crée'});
        res.cookie("userId", user._id, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ message: 'Connexion reussie'});
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

        if (user.password == password) {
            jwt.sign({id: user._id, email: user.email, password : user.password}, ENV.JWT_SECRETS, {}, (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(user);
        });
        }
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
}

//liste des utilisateurs
export const userList = async (req, res) => {
    try {
        const listUser = await Login.find(req.body);
        res.status(200).json(listUser);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

//recherche utilisateur précis
export const findUser = async (req, res) => {
    try {
        const {email} = req.query;
        let filter = {};
        if(email) filter.email = email;
        const user = await Login.findOne(filter);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}