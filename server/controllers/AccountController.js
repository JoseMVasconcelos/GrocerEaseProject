// Importando Express.
var express = require('express');

// Router do Express.
const router = express.Router();

// Body-Parser.
const jsonParser = express.json();

// Importando UserService.
const accountService = require('../services/AccountService');

// Importando Validações.
const { validate:signUpSchema } = require('../validations/AccountValidation');

// Cadastro do usuário
router.post('/signUp', jsonParser, async (req, res) => {
    try {
        const { error } = signUpSchema.validate(req.body);
        if (!error) {
            const result = await accountService.SignUp(req.body);
            return res.status(201).json({ message: "Usuário cadastrado com sucesso.", data: result });
        }
        return res.status(400).json({ error: 'Bad Request', exception: error });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error', exception: error });
    }
});
 

// Exportando o router.
module.exports = router;