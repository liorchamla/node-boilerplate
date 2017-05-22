const express = require('express');
const PageController = require('../controllers/PageController');
const router = express.Router();

router.get('/', PageController.home);

module.exports = router;