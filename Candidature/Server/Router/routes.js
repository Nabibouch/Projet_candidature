import express, { application } from 'express'
import cors from 'cors'
import { inscription } from './controller-back';
import { connexion } from './controller-back';
import { deconnexion } from './controller-back';
import { recupCandidatures } from './controller-back';
import { recupCandidatureSpé } from './controller-back';
import { addCandidature } from './controller-back';
import { majCandidature } from './controller-back';
import { deleteCandidature } from './controller-back';

const router = express.Router();

router.post('/register', inscription)
router.post('/connexion', connexion)
router.post('/deconnexion', deconnexion)
router.get('/recupCandidatures', recupCandidatures)
router.get('/recupCandidatureSpé', recupCandidatureSpé)
router.post('/addCandidature', addCandidature)
router.put('/majCandidature', majCandidature)
router.delete('/deleteCandidature', deleteCandidature)