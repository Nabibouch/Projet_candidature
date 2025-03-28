import mongoose from "mongoose";
import Joi from "joi";

const loginSchema = new mongoose.Schema({

    "email": {
        type: String,
        required: true,
        trim: true, // enlève automatiquement les espaces
        lowercase: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Le mot de passe doit contenir au moins une lettre majuscule, un chiffre et un caractère spécial."] // 2 à 10 caractères autorisés
    },
    "password": {
        type: String,
        required: true,
        minlength: 6
    }
});

const Login = mongoose.model("Login", loginSchema);

const loginValidation = Joi.object({
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "org", "net", "fr", "co", "io"] } }) // exige que l'email soit sous forme 'example.com' <= minDomainSegments: 2
        .messages({
            "string.empty": "Ce champ est obligatoire.",
            "string.email": "Veuillez entrer une adresse email valide."
        }),
    password: Joi.string()
        .min(6)
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)  // Doit contenir au moins une lettre, un chiffre et un caractère spécial
        .required()
        .messages({
            "string.empty": "Ce champ est obligatoire.",
            "string.min": "Le mot de passe doit contenir au moins 6 caractères",
            "string.pattern.base": "Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial (@$!%*?&)."
        })
})

export { Login, loginValidation }