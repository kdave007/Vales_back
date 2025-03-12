const express = require('express');
const router = express.Router();

const { test } = require('../controllers/mockController');

// Test endpoint
router.get('/', test);       

module.exports = router;