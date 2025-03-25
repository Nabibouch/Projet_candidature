import express, { application } from 'express'
import cors from 'cors'

const router = express.Router();

// Inscription
router.post("/authentification/register", async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.create ({email, password});
        res.status(201).json({message: 'Utilisateur crée'});
    } catch (error) {
        res.status(500).json({error: 'Inscription echouée'})
    }
    
});

// Connexion
router.post('/authentification/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Echec identification' });
    }
    req.session.userId = user._id;
    res.json({ message: 'Connexion reussie' });
});

// Deconnexion
router.post('authentification/logout', (req, res) => {
    req.session.destroy();
    res.json({messsage: 'Deconnexion reussie'})
})

// Récupération des candidatures
router.get('/candidature', async (req, res) => {
    if (!req.session.userId)
        return res.status(401).json({error: 'Erreur authentification'});
    const application = await application.find({userId: req.session.userId});
    res.json(application)
});

// Récupération d'une candidature spécifique
router.get('/candidature/:id', async (req, res) => {
    if (!req.session.userId)
        return res.status(401).json({error: 'Erreur authentification'});
    const application = await application.findbyId(req.params.id);
    if (!application || application.userId.toString() !== req.session.userId) {
        return res.status(404).json({error: 'Candidature non trouvée'});
    }
    res.json(application);
});

// Ajout candidature
router.post('/candidature', async (req, res) => {
    if (!req.session.userId)
        return res.status(401).json({error: 'Erreur authentification'});
    const application = await application.create({...req.body, userId: req.session.userId});
    res.status(401).json(application)
})



