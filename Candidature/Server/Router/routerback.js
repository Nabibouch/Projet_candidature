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
        res.status(500).json({error: 'Inscription echouée'});
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
try {
    req.session.destroy();
    res.json({messsage: 'Deconnexion reussie'});
} catch (error) {
    res.status(500).json({error: 'Echec deconnexion'});
}
});

// Récupération des candidatures
router.get('/candidature', async (req, res) => {
try{
    if (!req.session.userId)
        return res.status(401).json({error: 'Erreur authentification'});
    const application = await application.find({userId: req.session.userId});
    res.json(application);
} catch (error) {
    res.status(500).json({error: 'Erreur lors de la récuperation des candidatures'});
}
});

// Récupération d'une candidature spécifique
router.get('/candidature/:id', async (req, res) => {
try {
    if (!req.session.userId)
        return res.status(401).json({error: 'Erreur authentification'});
    const application = await application.findById(req.params.id);
    if (!application || application.userId.toString() !== req.session.userId) {
        return res.status(404).json({error: 'Candidature non trouvée'});
    }
    res.json(application);
} catch (error) {
    res.status(500).json({error: 'Erreur lors de la récuparation de la candidature'});
}
});

// Ajout candidature
router.post('/candidature', async (req, res) => {
try{
    if (!req.session.userId)
        return res.status(401).json({error: 'Erreur authentification'});
    const application = await application.create({...req.body, userId: req.session.userId});
    res.status(401).json(application);
} catch (error) {
    res.status(500).json({error: 'Erreur ajout candidature'});
}
});

// Mise à jour d' une candidature
router.put('application/:id', async (req, res) => {
try {
    if (!req.session.userId)
        return res.status(401).json({error: 'Erreur authentification'});
    const application = await application.findByIdAndUpdate(req.params.id, req.body, {new : true});
    res.json(application);
} catch (error) {
    res.status(500).json({error: 'Echec lors de la mise à jour de la candidature'});
}
});

// Suppression d'une candidature
router.delete('/application/:id', async (req, res) => {
    try {
        if (!req.session.userId)
            return res.status(401).json({error: 'Erreur authentification'});
        await application.findByIdAndDelete(req.params.id);
       es.json({message: 'Candidature supprimée'});
    } catch(error) {
        res.status(500).json({error: 'Erreur lors de la suppression'});
    }
});




