/* le package 'multer' gère les upload */
const multer = require('multer');

/* Gestion des types d'extensions autorisé*/
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/svg+xml': 'svg',
    'image/gif': 'gif'
};

/*Méthode 'diskStorage()' demande: un dossier de destination, et un nom de fichier 'filename()'*/
const storage = multer.diskStorage({
    destination: (req, file, callback) => { 
    // <- fonction callback : le 2ème argument est le /dossier de destination
        callback(null, './images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_').split('.')[0];
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('file');