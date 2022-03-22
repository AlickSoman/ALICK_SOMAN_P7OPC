const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment.js');
const auth = require('../middleware/auth.js');



/* route pour la création de commentaire */
router.post('/create', auth, commentCtrl.createComment);

/* route pour l'affichage de l'ensemble des commentaires */
router.get('/:postId/all', commentCtrl.getAllComments);

/* route pour l'affichage d'un commentaire en particulier */
router.get('/:id', commentCtrl.getOneComment);

/* route pour la modification d'un commentaire */
router.put('/:id', auth, commentCtrl.editComment);

/* route pour la suppression d'un commentaire */
router.delete('/:id', auth, commentCtrl.deleteComment);

/* exports */
module.exports = router;