// Importando Express.
const express = require('express');

// Importando Middleware de autenticação.
const TokenAuthenticator = require('./AuthMiddleware');

// Router do Express.
const router = express.Router();

// Importando métodos do AccountService e modelos de validação.
const { signUp, login, logout, patchUser } = require('../services/AccountService');
const { signUpSchema, loginSchema, patchSchema } = require('../validations/AccountValidation');

/**
 * Cria um novo usuário no sistema.
 * @param {Object} req - Requisição contendo nome, email, senha e senha confirmada do usuário.
 * @returns {Object} - JSON contendo a mensagem de sucesso e os dados do usuário cadastrado.
 */
router.post('/signUp', async (req, res) => {
    try {
        const { error } = signUpSchema.validate(req.body);
        if (error) return res.status(400).json({ exception:  error.message });

        const signUpResult = await signUp(req.body);
        // Caso o usuário já exista no sistema retorna Bad Request.
        if (signUpResult && signUpResult.status === 400){
            return res.status(400).json({ message: signUpResult.message })
        }
        return res.status(201).json({ message: "Usuário cadastrado com sucesso.", data: signUpResult });
    } catch (error) {
        return res.status(500).json({ exception: error.message });
    }
});

/**
 * Faz o login do usuário no sistema.
 * @param {Object} req - Requisição contendo email e senha do usuário.
 * @returns {Object} - JSON contendo um token de acesso.
 */
router.post('/login', async (req, res) => {
    try{
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).json({ exception:  error.message });

        const loginResult = await login(req.body);
        // Se o login der errado retorna Unauthorized.
        if (loginResult && loginResult.status === 401){
            return res.status(401).json({ message: loginResult.message });
        }
        return res.status(200).json({ token: loginResult });
    } catch (error){
        return res.status(500).json({ exception: error.message });
    }
});

/**
 * Faz o logout do usuário no sistema.
 * @param {Object} req - Requisição contendo o token do usuário.
 * @returns {String} - Mensagem de sucesso.
 */
router.post('/logout', TokenAuthenticator, async (req, res) => {
    try{
        const userToken = req.userData;
        await logout(userToken);
        res.status(200).json({ message: "Logout realizado com sucesso.", message: "Token Invalidado"});
    } catch (error){
        return res.status(500).json({ exception: error.message });
    }
});

/**
 * Atualiza campos do usuário.
 * @param {Object} req - Requisição contendo o token do usuário e os dados necessários para aatualizar.
 * @returns {Object} - Mensagem de sucesso e objeto com o usuário atualizado.
 */
router.patch('/users/', TokenAuthenticator, async (req, res) => {
    try {
        const userId = req.userData.userId;
        const updateData = req.body;

        const { error } = patchSchema.validate(updateData);
        if (error) return res.status(400).json({ exception:  error});

        const patchResult = await patchUser(userId, updateData);
        if (patchResult && patchResult.status === 401){
            return res.status(401).json({message: patchResult.message});
        }
        return res.status(201).json({ message: "Usuário atualizado com sucesso.", data: patchResult });
    } catch (error) {
        return res.status(500).json({exception: error.message });
    }
});

// Exportando o router.
module.exports = router;