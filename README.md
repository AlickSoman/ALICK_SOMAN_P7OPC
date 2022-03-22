# Projet OpenClassrooms: Groupomania

Prérequis:

    - Frontend: Vue.js
    - Backend: Node.js (avec Express.js)
    - ORM: Sequelize (avec sequelize CLI)
    - Database: MySQL

Installation process:

    - Clonez ce projet depuis GitHub
    - Ouvrir un terminal depuis la racine du projet

    - Pour le FRONTEND:
        cd vue-frontend
        npm install
        npm run serve

    - Pour le BACKEND:
        cd backend
        npm install
        npm i sequelize-cli
        npx sequelize-cli db:create
        node server.js 
        

    - Ouvrir un navigateur: http://localhost:8081
        
Description du projet:

    - Ce projet est une simulation d'un réseau social d'entreprise ici "GROUPOMANIA"
    - Le framework choisi pour le frontend est vue.js
    - Le backend tourne avec :
    Node.js
    Express.js
    et l'ORM Sequelize pour la création et gestion des modele de tables
    - la database est MySQL