import mongoose from "mongoose";
import Joi from "joi";

const loginSchema = new mongoose.Schema({
    "user_id": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true,
        trim: true, // enlève automatiquement les espaces
        lowercase: true,
        unique: true,
        match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,20}$/, "Veuillez entrer une adresse email valide."]
    }, // 2 à 20 caractères autorisés
    "password": {
        type: String,
        required: true,
        minlength: 6,
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial."]
    }
});

const Login = mongoose.model("Login", loginSchema);

const loginValidation = Joi.object({
    user_id: Joi.string()
        .required()
        .messages({
            "string.empty": "Ce champ est obligatoire.",
            "any.required": "Ce champ est obligatoire."
        }),
    email: Joi.string()
        .required()
        .email({ 
            minDomainSegments: 2, 
            tlds: { allow: ["com", "org", "net", "fr", "co", "io", "edu", "gov", "info", "photography"] } 
        }) // exige que l'email soit sous forme "example.com" <= minDomainSegments: 2
        .messages({
            "string.empty": "Ce champ est obligatoire.",
            "string.email": "Veuillez entrer une adresse email valide.",
            "any.required": "Ce champ est obligatoire."
        }),
    password: Joi.string()
        .min(6)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)  // doit contenir au moins une lettre, un chiffre et un caractère spécial
        .required()
        .messages({
            "string.empty": "Ce champ est obligatoire.",
            "string.min": "Le mot de passe doit contenir au moins 6 caractères",
            "string.pattern.base": "Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial (@$!%*?&).",
            "any.required": "Ce champ est obligatoire."
        })
})

export { Login, loginValidation }