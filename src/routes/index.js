const express = require('express');
const router = express.Router();

// Importar rutas
const authRoutes = require('./authRoutes');
const mock = require('./mockRoutes');
const data = require('./dataRoutes')

// Usar rutas
router.use('/', authRoutes);
router.use('/', mock);
router.use('/', data);

module.exports = router;