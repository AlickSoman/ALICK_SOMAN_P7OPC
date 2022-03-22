const jwt = require('jsonwebtoken');
const { User } = require('../models/index.js');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN); 
    
        /* Controller si le userId du token correspond à l'id du compte demander */
        User.findOne({where: {id: req.params.id}})
            .then(user => {
                if (decodedToken.userId == user.id) {
                    console.log("Merci d'avoir confirmer votre id");
                } else {
                    return res.status(403).json({ error});
                };
        next();
        });  
    } catch {
        console.log("accès non autorisé");
        res.status(401).json({error: 'accès refusé'});
    }
};