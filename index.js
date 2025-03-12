const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Usar rutas
const routes = require('./src/routes/index');

app.use('/api', routes); // Todas las rutas empiezan con /api

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});