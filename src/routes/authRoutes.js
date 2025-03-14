const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// Definir rutas para autenticación
router.post('/login', express.json(), login);       // Iniciar sesión

module.exports = router;