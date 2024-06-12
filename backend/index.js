const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Ruta para obtener productos desde el archivo JSON
app.get('/api/productos', (req, res) => {
    res.sendFile(path.join(__dirname, 'data', 'productos.json'));
});

// Servir archivos estáticos desde la carpeta frontend/public
app.use(express.static(path.join(__dirname, '../frontend/public')));

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});