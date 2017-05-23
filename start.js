/**
 * Node Boilerplate starter
 * - vérifie la version de node
 * - charge les variables d'environnement
 * - initialise la connexion à la base de données
 * - charge les models
 * - lance l'application
 */

const mongoose = require('mongoose');

/**
 * Vérification de la version de NodeJS (7.6 minimum)
 */
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major <= 7 && minor <= 5) {
  console.log('Votre version de NodeJS ne permet pas de faire tourner ce projet. Vous devez avoir la version 7.6 minimum\n');
  process.exit();
}

/**
 * On charge les variables d'environnement
 */
require('dotenv').config({ path: 'variables.env' });

/**
 * Couche d'accès aux données
 */
// Connexion à la base de donnée
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Utilisation des promesses de ES6
mongoose.connection.on('error', (err) => {
  console.error(`Erreur Mongo DB -> {err.message}\n`);
});

// Import des models
require('./models/Page');

// Start our app!
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
