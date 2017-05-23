/**
 * Fichier de gestion des routes de l'application !
 */
const express = require('express');
const router = express.Router();
// Controllers :
const PageController = require('../controllers/PageController'); // Demo controller qui gère les pages

/**
 * Front-end routes
 */
router.get('/', PageController.home);
router.get('/posts', PageController.index);
router.get('/post/:slug', PageController.show);
router.get('/posts/create', PageController.form);
router.post('/post/', PageController.create);

/**
 * Admin routes
 */

/**
 * API Routes
 */

module.exports = router;