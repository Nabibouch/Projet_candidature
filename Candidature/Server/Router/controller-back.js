// import le model

// Inscription
export const inscription =  async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.create ({email, password});
        res.status(201).json({message: 'Utilisateur crée'});
    } catch (error) {
        res.status(500).json({error: 'Inscription echouée'});
    }
};

// Connexion
export const connexion = async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Echec identification' });
    }
    req.session.userId = user._id;
    res.json({ message: 'Connexion reussie' });
};

// Deconnexion
export const deconnexion =  (req, res) => {
try {
    res.json({messsage: 'Deconnexion reussie'});
} catch (error) {
    res.status(500).json({error: 'Echec deconnexion'});
}
};

// Récupération des candidatures
export const recupCandidatures = async (req, res) => {
try{
    if (!req.session.userId)
        return res.status(401).json({error: 'Erreur authentification'});
    const application = await application.find({userId: req.session.userId});
    res.json(application);
} catch (error) {
    res.status(500).json({error: 'Erreur lors de la récuperation des candidatures'});
}
};

// Récupération d'une candidature spécifique
export const recupCandidatureSpé = async (req, res) => {
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
};

// Ajout candidature
export const addCandidature =  async (req, res) => {
try{
    if (!req.session.userId)
        return res.status(401).json({error: 'Erreur authentification'});
    const application = await application.create({...req.body, userId: req.session.userId});
    res.status(401).json(application);
} catch (error) {
    res.status(500).json({error: 'Erreur ajout candidature'});
}
};

// Mise à jour d' une candidature
export const majCandidature =  async (req, res) => {
try {
    if (!req.session.userId)
        return res.status(401).json({error: 'Erreur authentification'});
    const application = await application.findByIdAndUpdate(req.params.id, req.body, {new : true});
    res.json(application);
} catch (error) {
    res.status(500).json({error: 'Echec lors de la mise à jour de la candidature'});
}
};

// Suppression d'une candidature
export const deleteCandidature = async (req, res) => {
    try {
        if (!req.session.userId)
            return res.status(401).json({error: 'Erreur authentification'});
        await application.findByIdAndDelete(req.params.id);
       es.json({message: 'Candidature supprimée'});
    } catch(error) {
        res.status(500).json({error: 'Erreur lors de la suppression'});
    }
};




