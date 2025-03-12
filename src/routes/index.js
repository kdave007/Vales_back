const express = require('express');
const router = express.Router();

// Importar rutas
const authRoutes = require('./authRoutes');
const mock = require('./mockRoutes');

// Usar rutas
router.use('/', authRoutes);
router.use('/', mock);

module.exports = router;