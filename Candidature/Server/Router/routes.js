import express from 'express';
import { recupCandidatureSpé, recupCandidatures, addCandidature, majCandidature, deleteCandidature, countCandidature } from './controllerCandidature.js';
import {inscription, connexion, deconnexion} from '/.controllerLogin.js';

 const router = express.Router();

router.post('/register', inscription);
router.post('/connexion', connexion);
router.post('/deconnexion', deconnexion);
router.get('/recupCandidatures', recupCandidatures);
router.get('/recupCandidatureSpé', recupCandidatureSpé);
router.post('/addCandidature', addCandidature);
router.put('/majCandidature/:id', majCandidature);
router.delete('/deleteCandidature/:id', deleteCandidature);
router.get('/countCandidature', countCandidature)

export default router;