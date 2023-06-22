// Importando middleware para validação da requisição.
const joi = require('joi');

// Esquema de validação para cadastro.
const signUpSchema = joi.object({
    // O regex permite alphanumericos com espaços entre os nomes.
    name: joi.string().regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirm_password: joi.ref('password'),
});

// Esquema de validação para o login.
const loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
});

// Esquema de validação para cadastro.
const patchSchema = joi.object({
    // O regex permite apenas letras e nuemros com espaços entre palavras.
    name: joi.string().regex(/^(\w+\s*)+$/),
    email: joi.string().email(),
    password: joi.string().min(6),
});

module.exports = {
    signUpSchema,
    loginSchema,
    patchSchema,
}
