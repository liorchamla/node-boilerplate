const express = require('express');
const routes = require('./config/routes');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Moteurs de vues
app.set('views', path.join(__dirname, 'views')); // Dossier contenant les vues 
app.set('view engine', 'pug'); // On utilise le moteur de vues PUG

// Fichiers publics (JS, CSS, images, etc)
app.use(express.static(path.join(__dirname, 'public')));

// Utilisation de bodyParser pour lire la requête et générer un objet body dans la requête (req)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mise en place des helpers qui seront disponibles dans les locals (donc dans les vues)
app.use((req, res, next) => {
    res.locals.h = require('./helpers');
    next();
})

/**
 * Mise en place des routes qui se trouvent dans le fichier config/routes.js
 */
app.use('/', routes);

module.exports = app;