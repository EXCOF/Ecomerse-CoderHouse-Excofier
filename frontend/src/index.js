import React from 'react';
import ReactDOM from 'react-dom'; // Asegúrate de importar ReactDOM
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const root = createRoot(document.getElementById("root")); // No es necesario usar ReactDOM.createRoot
root.render(<App />);