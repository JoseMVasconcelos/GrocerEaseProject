// Importando middleware para validação da requisição.
const joi = require('joi');

// Esquema de validação para cadastro.
const signUpSchema = joi.object({
    name: joi.string().alphanum().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirm_password: joi.ref('password'),
});

// Esquema de validação para o login.
const loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
});

module.exports = {
    signUpSchema,
    loginSchema,
}
