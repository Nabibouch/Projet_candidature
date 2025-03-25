import express from 'express'
import cors from 'cors'

const router = express.Router();

router.get("/authentification/register", async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.create ({email, password});
        res.status(201).json({message: 'Utilisateur crée'});
    } catch (error) {
        res.status(500).json({error: 'Inscription echouée'})
    }
    
});




