import express from 'express';
import { recupCandidatureSpe, recupCandidatures, addCandidature, majCandidature, deleteCandidature, countCandidature } from './controllerCandidature.js';
import { connexion, deconnexion, inscription } from "./controllerLogin.js";
const router = express.Router();

router.post('/register', inscription);
router.post('/connexion', connexion);
router.post('/deconnexion', deconnexion);
router.get('/recupCandidatures', recupCandidatures);
router.get('/recupCandidatureSpe/:id', recupCandidatureSpe);
router.post('/addCandidature', addCandidature);
router.put('/majCandidature/:id', majCandidature);
router.delete('/deleteCandidature/:id', deleteCandidature);
router.get('/compte', countCandidature);

export default router;
