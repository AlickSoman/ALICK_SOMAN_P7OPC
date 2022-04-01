# Projet OpenClassrooms: Groupomania

Prérequis:
Technologies :
    - Frontend: Vue.js
    - Backend: Node.js (avec Express.js)
    - ORM: Sequelize (avec sequelize CLI : Pour la connexion et la gestion/interaction de la base de données)
    - Database: MySQL (Vous pouvez utiliser : MAMP-PHPmyAdmin ou MySQL WorkBench)Pour la mise en place de notre db relationnelle

Installation process:

    - Clonez ce projet depuis GitHub
    - Ouvrir un terminal depuis la racine du projet

    - Pour le FRONTEND:
        cd groupomania-réseau-social
        npm install
        npm run serve 

    - Pour le BACKEND:
        cd backend
        npm install
        npm i sequelize-cli
        npx sequelize-cli db:create
Dans app.js =>
        /* Décommenter uniquement pour la création des tables MySQL si elles n'existent pas */
// sequelize.sync({ force: false });
// sequelize.sync({ alter: true }

Installer nodemon = lancer le server avec npm run start ou node server.js 
        

    - Ouvrir un navigateur: http://localhost:8081 (OU 8080)
        
Description du projet:

    - Ce projet est une simulation d'un réseau social d'entreprise ici "GROUPOMANIA"
    - Le framework choisi pour le frontend est vue.js
    - Le backend tourne avec :
    Node.js
    Express.js
    et l'ORM Sequelize pour la création et gestion des modele de tables
    - la database est MySQL