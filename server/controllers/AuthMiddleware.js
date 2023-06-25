// Importando biblioteca do JWT.
const jwt = require('jsonwebtoken');

/**
 * Middleware que realizará a autenticação do usuário.
 * A cada requisição feita esse middleware é chamado.
 */
function TokenAuthenticator(req, res, next) {
    // Buscar o token no cabeçalho.
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401);

    // Verifica a integridade do token.
    // Caso esteja expirado retorna um Unauthorized.
    // Caso aconteça outro erro retorna Forbidden.
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.sendStatus(403);
        }

        // O payload quando decodificado será armazenado no req.userData,
        // E poderá ser acessado em qualquer outra rota protegida.
  
        req.userData = {
            ...decoded,
            token
        };

        next();
    });
}

module.exports = TokenAuthenticator;