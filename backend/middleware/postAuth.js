const jwt = require('jsonwebtoken');
const { Post } = require('../models/index.js');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        const decodedToken = jwt.verify(token, process.env.TOKEN); 

        Post.findOne({where: {id: req.params.id}})
            .then(post => {
                if (decodedToken.isAdmin) {
                    console.log("Vous êtes admin");
                }
                else if (decodedToken.userId == post.userId) {
                    console.log("Vous êtes bien le propriétaire de ce post");
                } 
                else {
                    console.log("Vous n'avez pas les droits sur ce post")
                    return res.status(403);
                };
        next();      
        });
    } catch {
        console.log("Accès non autorisé");
        res.status(401).json({error: 'Accès refusé'});
    }
};