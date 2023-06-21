// Importanado modelo de usuário da base de dados.
const User = require('../models/UserModel');

// Importando middleware para criptografia de senha.
const bcrypt = require('bcryptjs');

// Importando service de Autenticação.
const { GenerateBearerToken } = require('../services/AuthService');

/**
 * Cria um novo usuário no sistema.
 * @param {Object} userCredentials - Credenciais do usuário: nome, email, senha e confirmação de senha.
 * @returns {Object} - Objeto contendo Id, nome e email do usuário cadastrado.
 */
async function signUp(userCredentials) {
    const { name, email, password } = userCredentials;

    const userExists = await User.findOne({ email });
    if (userExists) {
        return badRequestResponse = {
            message: 'O usuário já existe no sistema.',
            status: 400
        };
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
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
    };

    return createdUser;
}

/**
 * Faz o login do usuário no sistema.
 * @param {Object} userCredentials - Credenciais do usuário: email e senha.
 * @returns {String} - Token de acesso.
 */
async function login(userCredentials) {
    const { email, password } = userCredentials;

    const user = await User.findOne({ email });

    const passwordIsCorrect = bcrypt.compareSync(password, user.password);

    // Se o usuário não existir, ou se a senha estiver incorreta, retornará Unauthorized.
    if (!user || !passwordIsCorrect) {
        return unauthorizedResponse = {
            message: 'Credenciais inválidas ou usuário inexistente.',
            status: 401
        };
    }

    const userToken = GenerateBearerToken(user);

    return userToken;
}

module.exports = { 
    signUp,
    login,
};