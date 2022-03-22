/* imports généraux */
const express = require('express');
const mysql = require('mysql2');
const { sequelize } = require('./models/index.js');
const path = require('path');

/* importations des routes */
const usersRoutes = require('./routes/users.js');
const postsRoutes = require('./routes/posts.js');
const commentsRoutes = require('./routes/comments.js');

/* implémentation de l'app express() */
const app = express();

/* ajout de sécurité */
require('dotenv').config();
const helmet = require("helmet");
app.use(helmet());

/* Vérification si la connexion avec sequelize est bien établie */
try {
    sequelize.authenticate();
    console.log('Connection Sequelize to MySQL > successful');
} catch (error) {
    console.error('Unable to connect sequelize to the database:', error);
}
/* Décommenter uniquement pour la création des tables MySQL si elles n'existent pas */
// sequelize.sync({ force: false });
// sequelize.sync({ alter: true })

/* middleware général pour établir les autorisations (*, CORS, METHODS) */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/* middleware qui va parser et return un objet json */
app.use(express.json());

/* logique routage */
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')))

/* exports */
module.exports = app;