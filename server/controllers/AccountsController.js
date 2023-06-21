// Importando Express.
const express = require('express');

// Router do Express.
const router = express.Router();

// Importando AccountService.
const accountService = require('../services/AccountService');

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
        // Caso haja um erro na validação dos parâmetros retorna Bad Request.
        if (error) return res.status(400).json({exception:  error});

        const signUpResult = await accountService.SignUp(req.body);
        // Caso o usuário já exista no sistema retorna Bad Request.
        if (signUpResult && signUpResult.status === 400){
            return res.status(400).json({message: signUpResult.message})
        }
        return res.status(201).json({message: "Usuário cadastrado com sucesso.", data: signUpResult });
    } catch (error) {
        return res.status(500).json({exception: error.message});
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
        // Caso haja um erro na validação dos parâmetros retorna Bad Request.
        if (error) return res.status(400).json({exception:  error});

        const loginResult = await accountService.Login(req.body);
        // Se o login der errado retorna Unauthorized.
        if (loginResult && loginResult.status === 401){
            return res.status(401).json({message: loginResult.message});
        }
        return res.status(200).json({token: loginResult});
    } catch (error){
        return res.status(500).json({exception: error });
    }
});

// Exportando o router.
module.exports = router;