// Importando Express.
const express = require('express');
// Importando controladores de login.
const { signInView, loginView } = require('../controllers/loginController');

// Router do Express
const router = express.Router();

// Requisições GET.
router.get('/signIn', signInView);
router.get('/login', loginView);

// Exportando as rotas.
module.exports = router;