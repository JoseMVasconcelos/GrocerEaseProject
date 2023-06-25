// Importando biblioteca do JWT.
const jwt = require('jsonwebtoken');
const InvalidToken = require('./../models/InvalidTokenModel')

/**
 * Middleware que realizará a autenticação do usuário.
 * A cada requisição feita esse middleware é chamado.
 */
async function TokenAuthenticator(req, res, next) {
    // Buscar o token no cabeçalho.
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401);

    const tokenAlreadyExists = await InvalidToken.findOne({ token })
                    
    if (tokenAlreadyExists) {
        console.log(tokenAlreadyExists)
        return res.status(403).json({ exception: 'invalid token' })
    }

    // Verifica a integridade do token.
    // Caso esteja expirado retorna um Unauthorized.
    // Caso aconteça outro erro retorna Forbidden.
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(403).json({ exception: 'invalid token' })
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