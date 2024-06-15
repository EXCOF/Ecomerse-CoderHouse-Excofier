const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Ruta para servir el archivo productos.json
app.get('/api/productos', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'productos.json'));
});

// Ruta para servir los archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Ruta para servir la aplicación React en cualquier ruta que no sea /api/productos
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en el puerto ${port}`);
});