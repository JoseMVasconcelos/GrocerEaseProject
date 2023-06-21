// Importando Express.
const express = require('express');

// Router do Express.
const router = express.Router();

// Importando métodos do AccountService.
const { signUp, login, patchUser } = require('../services/AccountService');

// Importando Validações.
const { signUpSchema, loginSchema } = require('../validations/AccountValidation');

/**
 * Cria um novo usuário no sistema.
 * @param {Object} req - Requisição contendo nome, email, senha e senha confirmada do usuário.
 * @returns {Object} - JSON contendo a mensagem de sucesso e os dados do usuário cadastrado.
 */
router.post('/signUp', async (req, res) => {
    try {
        const { error } = signUpSchema.validate(req.body);
        if (error) return res.status(400).json({ exception:  error});

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
        if (error) return res.status(400).json({ exception:  error });

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
 * Atualiza campos do usuário.
 * @param {Object} req - Requisição contendo dados para atualizar o usuário.
 * @returns {Object} - Mensagem de sucesso e objeto com o usuário atualizado.
 */
router.patch('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;
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