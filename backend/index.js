// Cargar las variables de entorno
require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para obtener los productos desde el archivo JSON
app.get('http://localhost:3000/data/productos.json', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'productos.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error al leer el archivo de productos');
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});