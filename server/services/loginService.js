// Importanado modelo de usuário da base de dados.
const User = require('../models/UserModel');

// Importando middleware para criptografia de senha.
const bcrypt = require('bcryptjs');

// Cadastro.
async function SignUp(userCredentials) {
    const { name, email, password, confirm } = userCredentials;

    if (!name || !email || !password || !confirm) {
        throw new Error('Parametro não preenchido');
    }

    if (password !== confirm) {
        throw new Error('As senhas devem ser iguais.');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('O usuário já existe.');
    }

    // Criptografando senha.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Criando novo modelo de usuário.
    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });

    // Salvando na base.
    await newUser.save();

    const createdUser = {
        name: newUser.name,
        email: newUser.email
    };

    return createdUser;
}

module.exports = SignUp;