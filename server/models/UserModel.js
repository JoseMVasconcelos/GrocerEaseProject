const mongoose = require('mongoose');

// Schema Usuário: Nome, email e senha.
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,   
    },
    password: {
        type: String,
        required: true,
    }
})

// Modelo para usuário.
const User = mongoose.model("User", UserSchema);
module.exports = User;