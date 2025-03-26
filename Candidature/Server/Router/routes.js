import express from 'express';
import { inscription, connexion, deconnexion, recupCandidatureSpé, recupCandidatures, addCandidature, majCandidature, deleteCandidature } from './controllerCandidature.js';

const router = express.Router();

router.post('/register', inscription);
router.post('/connexion', connexion);
router.post('/deconnexion', deconnexion);
router.get('/recupCandidatures', recupCandidatures);
router.get('/recupCandidatureSpé', recupCandidatureSpé);
router.post('/addCandidature', addCandidature);
router.put('/majCandidature/:id', majCandidature);
router.delete('/deleteCandidature/:id', deleteCandidature);

export default router;