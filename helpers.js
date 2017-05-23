/**
 * Helpers pour les vues et autres tâches
 */

// Utilisation de la librairie moment.js pour le formatage des dates
exports.moment = require('moment');

// Autres infos
exports.siteName = "Lior's Boilerplate - Node, Express, Pug, WebPack"; // Titre du site (balise <title>)
exports.headline = "Lior's Boilerplate"; // Titre du site 

// Fonction utile pour debugguer !
exports.dump = (obj) => JSON.stringify(obj, null, 2);

