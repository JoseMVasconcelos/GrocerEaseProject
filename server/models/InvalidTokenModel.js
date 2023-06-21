const mongoose = require('mongoose');

// Schema Usuário: Nome, email e senha.
const invalidTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
})

// Modelo para Lista de etoken inválidos.
module.exports = mongoose.model("InvalidToken", invalidTokenSchema);