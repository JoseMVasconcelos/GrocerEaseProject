// Importanado modelo de usuário da base de dados.
const User = require('../models/UserModel');

// Importando modelo de lista de tokens inválidos da base de dados.
const InvalidToken = require('../models/InvalidTokenModel');

// Importando middleware para criptografia de senha.
const bcrypt = require('bcryptjs');

// Importando service de Autenticação.
const { generateBearerToken } = require('../services/AuthService');

/**
 * Cria um novo usuário no sistema.
 * @param {Object} userCredentials - Credenciais do usuário: nome, email, senha e confirmação de senha.
 * @returns {Object} - Objeto contendo Id, nome e email do usuário cadastrado.
 */
async function signUp(userCredentials) {
    const { name, email, password } = userCredentials;

    const userExists = await User.findOne({ email });
    // Se o usuário já existir retorna Bad Request.
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

    return createdUser = {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
    };
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

    const userToken = generateBearerToken(user);

    return userToken;
}

/**
 * Faz o logout do usuário no sistema.
 * @param {String} userToken - Token do usuário.
 */
async function logout(userToken) {
    const logoutResult = new InvalidToken(userToken);
    await logoutResult.save();
}

/**
 * Atualiza o cadastro do usuário já existente
 * @param {String} userId - Id do usuário que será atualizado.
 * @param {Object} updateData - Atributos do usuário: name, email, password.
 * @returns {Object} - Atributos do usuário: name, email.
 */
async function patchUser(userId, updateData) {
    const { name, email, password } = updateData;

    const existingUser = await User.findById(userId);

    if (!existingUser) {
        return { 
            message: 'ID de usuário não encontrado no banco de dados', 
            status: 401
        };
    }

    // Atualizando usuario
    existingUser.name = name ? name : existingUser.name
    existingUser.email = email ? email : existingUser.email 
    if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        existingUser.password = hashedPassword
    }

    // Salvando na base.
    await existingUser.save();

    return userUpdated = {
        name: existingUser.name,
        email: existingUser.email,
    };
}

module.exports = { 
    signUp,
    login,
    logout,
    patchUser,
};
