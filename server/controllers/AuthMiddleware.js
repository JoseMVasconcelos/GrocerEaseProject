// Importando biblioteca do JWT.
const jwt = require('jsonwebtoken');

/**
 * Middleware que realizará a autenticação do usuário.
 * A cada requisição feita esse middleware é chamado.
 * @returns {Object} - Objeto contendo Id, nome e email do usuário cadastrado.
 */
function TokenAuthenticator(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401);

    // Verifica a integridade do token.
    // Caso esteja expirado retorna um Unauthorized.
    // Caso aconteça outro erro retorna Forbidden.
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, decoded) => {
        if (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'O Token expirou'});
            }
            return res.sendStatus(403);
        }

        // O payload quando decodificado será armazenado no req.userData,
        // E poderá ser acessado em qualquer outra rota protegida.
        req.userData = decoded;

        next();
    });
}

module.exports = TokenAuthenticator;