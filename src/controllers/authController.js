// src/controllers/authController.js
// Este es el controlador de autenticación. Aquí se manejarán las solicitudes de autenticación.

// Importar modelos
const User = require('../models/user');

// Función para iniciar sesión
const login = async (req, res) => {
  // Extraer credenciales de la solicitud
  const { email, password } = req.body;

  try {
    // Buscar el usuario en la base de datos
    const user = await User.findOne({ email });

    // Verificar si el usuario existe y si la contraseña es correcta
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ msg: 'Credenciales incorrectas' });
    }

    // Generar un token de autenticación y enviarlo al cliente
    const token = await user.generateAuthToken();
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al iniciar sesión' });
  }
};

module.exports = { login };
