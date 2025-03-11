const express = require('express');
const router = express.Router();

// Importar rutas
const authRoutes = require('./authRoutes');

// Usar rutas
router.use('/authRoutes', authRoutes);