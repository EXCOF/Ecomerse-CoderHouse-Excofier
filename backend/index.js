const express = require('express'); // Importa el módulo Express
const path = require('path'); // Importa el módulo Path para manejar rutas de archivos
const app = express(); // Crea una aplicación de Express
const port = 3000; // Define el puerto en el que correrá el servidor

// Ruta para obtener productos desde el archivo JSON
app.get('/api/productos', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'productos.json')); // Envía el archivo productos.json como respuesta
});

// Servir archivos estáticos desde la carpeta frontend/public
app.use(express.static(path.join(__dirname, '../frontend/public'))); // Define la carpeta de archivos estáticos

// Inicia el servidor y escucha en el puerto definido
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`); // Muestra un mensaje en la consola indicando que el servidor está funcionando
});