// Importando e inicializando o Express.
const express = require('express');
const app = express();

// Importando rotas para requisições ligadas ao login.
app.use('/', require('./routes/loginRoutes'));

// Aplicação rodando na porta 3000 (padrão express).
const PORT = 3000;
app.listen(PORT, console.log("Server has started at port " + PORT));