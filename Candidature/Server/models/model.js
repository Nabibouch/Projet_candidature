import mongoose from "mongoose";
import Joi from "joi";


const candidatureSchema = new mongoose.Schema({

    company: {
        type: String,
        minLength: 2,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['En attente', 'Acceptée', 'Refusée'],
        required: true,
        default: "En attente"
    },
    date: {
        type: String,
        required: true,
        // default: Date.now
    },
    userId: {
        type: String,
        required: true,
    },
}, 
{
    timestamps: true 
});

const Candidature = mongoose.model("Candidature", candidatureSchema);

const candidatureValidation = Joi.object({
    company: Joi.string()
        .min(2)
        .required()
        .messages({
            "string.empty": "Ce champ est obligatoire.",
            "string.min": "Le nom de l'entreprise doit contenir au moins 2 caractères."
        }),
    post: Joi.string()
        .required()
        .messages({
            "string.empty": "Ce champ est obligatoire."
        }),
    link: Joi.string()
        .uri()
        .required()
        .messages({
            "string.empty": "Ce champ est obligatoire.",
            "string.uri": "Le lien doit être une URL valide."
        }),
    status: Joi.string()
        .valid("En attente", "Acceptée", "Refusée")
        .required()
        .messages({
            "string.empty": "Ce champ est obligatoire.",
            "any.only": "Le statut doit être 'En attente', 'Acceptée' ou 'Refusée'."
        }),
    date: Joi.date()
        .required()
        .messages({
            "any.required": "Ce champ est obligatoire.",
            "date.base": "La date doit être valable."
        }),
    user_id: Joi.string()
            .required()
            .messages({
                "string.empty": "Ce champ est obligatoire.",
                "any.required": "Ce champ est obligatoire."
            }),
})

export {Candidature, candidatureValidation};