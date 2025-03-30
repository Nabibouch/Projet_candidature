import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { recupCandidatureSpe, recupCandidatures, addCandidature, majCandidature, deleteCandidature, countCandidature, recupCandidaturesUser } from './controllerCandidature.js';
import { connexion, deconnexion, findUser, inscription, userList  } from "./controllerLogin.js";

const router = express.Router();
router.use(cookieParser());
router.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }
}))

router.post('/register', inscription);
router.post('/connexion', connexion);
router.post('/deconnexion', deconnexion);
router.get('/recupCandidatures', recupCandidatures);
router.get('/recupCandidatureSpe/:id', recupCandidatureSpe);
router.post('/addCandidature', addCandidature);
router.put('/majCandidature/:id', majCandidature);
router.delete('/deleteCandidature/:id', deleteCandidature);
router.get('/compte', countCandidature);
router.get('/session/:id', session);
router.get('/userList', userList);
router.get('/user', findUser);
router.get('/dashboard', recupCandidaturesUser);

export default router;
