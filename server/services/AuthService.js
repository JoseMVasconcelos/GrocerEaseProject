// Importando biblioteca para geração de JWT.
const jwt = require('jsonwebtoken');

/**
 * Cria um novo usuário no sistema.
 * @param {Object} user - Objeto User.
 * @returns {String} - Token de acesso.
 */
function generateBearerToken(user) {
    const payload = {
        userId: user.id,
        username: user.name,
        email: user.email,
    };

    // Gera o JWT.
    const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });

    return token;
}

module.exports = generateBearerToken;