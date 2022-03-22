const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.js');
// Le auth doit être avent le "userCtrl" pour controller assuré que l'user et bien connecté
const auth = require('../middleware/userAuth.js');
// middleware de gestion des images
const multer = require('../middleware/multer-config.js'); 


/* route pour la création d'un user */
router.post('/signup', userCtrl.signup);

/* route pour l'authentification user */
router.post('/login', userCtrl.login)

/* route pour modifier le user */
router.put('/:id', auth, multer, userCtrl.editUser);

/* route pour l'affichage de l'ensemble des users */
router.get('/all', userCtrl.getAllUsers);

/* route pour l'affichage de l'user connecté */
router.get('/:id', userCtrl.getOneUser);

/* route pour la suppression de l'user */
router.delete('/:id', auth, userCtrl.deleteUser);

/* exports */
module.exports = router;