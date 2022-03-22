const jwt = require('jsonwebtoken');
// CTR auth
module.exports = (req, res, next) => {
    try {
// récupére le token et le décoder, pour l'authentification
        const token = req.headers.authorization.split(' ')[1]; 
        const decodedToken = jwt.verify(token, process.env.TOKEN); 
        if (!decodedToken.userId) {
            throw 'Token non valide!';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Requête non valide!')
        });
    }
};