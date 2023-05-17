// Importando e inicializando o Express.
const express = require('express');
const app = express();

// Aplicação rodando na porta 3000.
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("Server has started at port " + PORT));