const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.js');
const auth = require('../middleware/auth.js');
const postAuth = require('../middleware/postAuth.js');
const multer = require('../middleware/multer-config.js');
const likesCtrl = require('../controllers/likes.js');


/* route création post */
router.post('/create', auth, multer, postCtrl.createPost);

/* route pour l'affichage de l'ensemble des posts */
router.get('/all', postCtrl.getAllPosts);

/* route pour l'affichage d'un post en particulier */
router.get('/:id', postCtrl.getOnePost);

/* route pour la modification de post */
router.put('/:id', postAuth, multer, postCtrl.editPost);

/* route pour la suppression d'un post */
router.delete('/:id', postAuth, postCtrl.deletePost);

/* route pour like un post */
router.post('/:postId/like', likesCtrl.likePost);

/* route unliker un post */
router.delete('/:postId/unlike', likesCtrl.unlikePost);

/* route pour récupérer les likes d'un post */
router.get('/:postId/likes', likesCtrl.getAllLikesPost);

/* exports */
module.exports = router;