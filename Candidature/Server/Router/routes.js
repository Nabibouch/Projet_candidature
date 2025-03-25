import express, { application } from 'express'
import cors from 'cors'
import { inscription } from './controller-back';

const router = express.Router();

router.post('/register', inscription)
router.post('/connexion', connexion)
router.post('/deconnexion', deconnexion)
router.get('/recupCandidatures', recupCandidatures)
router.get('/recupCandidatureSpé', recupCandidatureSpé)
router.post('/addCandidature', addCandidature)
router.put('/majCandidature', majCandidature)
router.delete('/deleteCandidature', deleteCandidature)