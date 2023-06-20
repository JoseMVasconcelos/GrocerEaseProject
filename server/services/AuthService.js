// Importando biblioteca para geração de JWT.
const jwt = require('jsonwebtoken');

// Geração de um JSON Web Token de um usuário.
function GenerateBearerToken(user) {
    const payload = {
        userId: user.id,
        username: user.name,
        email: user.email,
    };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });

    return token;
}

module.exports = { GenerateBearerToken };