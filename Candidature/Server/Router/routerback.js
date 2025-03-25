import express from 'express'
import cors from 'cors'

const router = express.Router();

router.post("/authentification/register", async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.create ({email, password});
        res.status(201).json({message: 'Utilisateur crée'});
    } catch (error) {
        res.status(500).json({error: 'Inscription echouée'})
    }
    
});

router.post('/authentification/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Echec identification' });
    }
    req.session.userId = user._id;
    res.json({ message: 'Connexion reussie' });
});

router.post('authentification/logout', (req, res) => {
    req.session.destroy();
    res.json({messsage: 'Deconnexion reussie'})
})




