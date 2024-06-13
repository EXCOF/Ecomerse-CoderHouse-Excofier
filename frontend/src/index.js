import React from 'react'; // Importa React
import ReactDOM from 'react-dom'; // Importa ReactDOM
import App from './app'; // Importa el componente App desde app.js
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import './style.css'; // Importa los estilos CSS personalizados
import { createRoot } from 'react-dom/client';


// Crear el root
const container = document.getElementById('app');
const root = createRoot(container);

// Renderiza el componente App en el root
root.render(<App tab="home" />);