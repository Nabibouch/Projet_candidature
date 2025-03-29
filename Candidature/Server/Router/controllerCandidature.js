import { Candidature } from "../models/model.js";



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

export const recupCandidatureSpe = async (req, res) => {
try {
    const { id } = req.params ;
    
    const application = await Candidature.findById(id);
    
    res.json(application);
} catch (error) {
    res.status(500).json({error: error.message});
}
};

// Récupération des candidatures d'un utilisateur

export const recupCandidaturesUser = async (req, res) => {
try {
    const { userId } = req.params ;
    
    const application = await Candidature.findOne({userId});
    
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


export const countCandidature = async (req, res) => {
    try {
        const { status } = req.query;
        let filter = {};
        if(status) filter.status = status;
        const count = await Candidature.countDocuments(filter);
        res.status(200).json({total: count});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
