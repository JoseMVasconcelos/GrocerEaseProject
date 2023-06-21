// Importando e inicializando o Express.
const express = require('express');
const app = express();

// Importando o CORS.
const cors = require('cors');

// Importando Middleware de autenticação.
const TokenAuthenticator = require('./controllers/AuthMiddleware');

// Importando mongoose e dotenv.
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Mongo Db Connection.
const database = process.env.MONGOLAB_URI;

// Importando rotas.
const userRouter = require('./controllers/AccountsController')
const shoppingListsRouter = require('./controllers/ShoppingListsController')

mongoose.connect(database, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log('database connected'))
.catch(error => console.log(error));

// Utililzando o CORS.
app.use(cors());

// Utilizando o BodyParser.
app.use(express.json())

// Rotas ligadas ao usuário.
app.use('/', userRouter);

// Rotas utilizadas na lista de compra.
app.use('/shoppingLists', TokenAuthenticator, shoppingListsRouter);

// Aplicação rodando na porta 3000 (padrão express).
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server has started at port " + PORT)
});