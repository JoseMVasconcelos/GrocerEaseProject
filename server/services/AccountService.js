// Importanado modelo de usuário da base de dados.
const User = require('../models/UserModel');

// Importando middleware para criptografia de senha.
const bcrypt = require('bcryptjs');

const authService = require('../services/AuthService');

// Cadastro.
async function SignUp(userCredentials) {
    const { name, email, password } = userCredentials;

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

async function Login(userCredentials) {
    const { email, password } = userCredentials;

    const user = await User.findOne({ email });

    const passwordIsCorrect = bcrypt.compareSync(password, user.password);

    // Se o usuário não existir, ou se a senha estiver incorreta, retornará nulo.
    if (!user || !passwordIsCorrect) {
        const unauthorizedResponse = {
            message: 'Credenciais inválidas',
            status: 401
        };
        return unauthorizedResponse
    }

    const userToken = authService.GenerateBearerToken(user);

    return userToken;
}

module.exports = { 
    SignUp,
    Login,
};