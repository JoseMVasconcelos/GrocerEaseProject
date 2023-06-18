// Importando e inicializando o Express.
const express = require('express');
const app = express();

// Importando mongoose e dotenv
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Mongo Db Connection
const database = process.env.MONGOLAB_URI;

mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('database connected'))
    .catch(error => console.log(error));

// Importando rotas para requisições ligadas ao login.
app.use('/user', require('./controllers/AccountController'));

// Aplicação rodando na porta 3000 (padrão express).
const PORT = 3000;
app.listen(PORT, console.log("Server has started at port " + PORT));