import { Candidature } from "../models/modelCandidature.js";


// Récupération des candidatures
export const recupCandidatures = async (req, res) => {
try{
    const application = await Candidature.find(res.body);
    res.json(application);
} catch (error) {
    res.status(500).json({error: error.message});
}
};

// Récupération d'une candidature spécifique
export const recupCandidatureSpé = async (req, res) => {
try {
    const application = await Candidature.findById(req.params.id);
    if (!application || application.userId.toString() !== res.body) {
        return res.status(404).json({error: error.message});
    }
    res.json(application);
} catch (error) {
    res.status(500).json({error: error.message});
}
};

// Ajout candidature
export const addCandidature =  async (req, res) => {
try{
    console.log(req.body);
    const application = await Candidature.create(req.body);
    res.status(201).json(application);
} catch (error) {
    res.status(500).json({error: error.message});
}
};

// Mise à jour d' une candidature
export const majCandidature =  async (req, res) => {
try {
    const application = await Candidature.findByIdAndUpdate(req.params.id, req.body, {new : true});
    res.json(application);
} catch (error) {
    res.status(500).json({error:error.message});
}
};

// Suppression d'une candidature
export const deleteCandidature = async (req, res) => {
    try {
        await Candidature.findByIdAndDelete(req.params.id);
       res.json({message: 'Candidature supprimée'});
    } catch(error) {
        res.status(500).json({error:error.message});
    }
};

// Comptage des candidatures
export const countCandidature = async (req, res) => {
    try{
        const count = await Candidature.countDocuments(req.body)
        res.json({total: count});
    } catch(error) {
        res.status(500).json({error:error.message});
    }
};