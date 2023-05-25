// Importando Express.
var express = require('express');

// Router do Express.
const router = express.Router();

// Body-Parser.
const jsonParser = express.json();

// Importando UserService.
const userService = require('../services/loginService');

// Importando Validações.
const { signUpSchema } = require('../validations/loginValidation');

// Cadastro do usuário
router.post('/signUp', jsonParser, async (req, res) => {
    try {
        const error = signUpSchema.validate(req.body);
        if (!error) {
            const result = await userService.SignUp(body);
            res.sendStatus(201).json({ message: "Usuário cadastrado com sucesso.", data: result });
        }
        res.sendStatus(400).json({ error: 'Bad Request', exception: error });
    } catch (error) {
        res.sendStatus(500).json({ error: 'Internal Server Error', exception: error });
    }
});  

// Exportando o router.
module.exports = router;