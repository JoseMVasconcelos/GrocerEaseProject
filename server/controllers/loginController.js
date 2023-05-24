// Importando Express.
var express = require('express');

// Router do Express
const router = express.Router();

// Body-Parser
const jsonParser = express.json();

// Importando UserService
const userService = require('../services/loginService');

// Cadastro do usuário
router.post('/signUp', jsonParser, async (req, res) => {
    try {
        const { body } = req;
        const result = await userService.SignUp(body);
        res.sendStatus(201).json({
            message: "Usuário cadastrado com sucesso.",
            data: result,
        });
    } catch (error) {
        res.sendStatus(500).json({ error: 'Internal Server Error', exception: error });
    }
  });  

// Exportando o router.
module.exports = router;