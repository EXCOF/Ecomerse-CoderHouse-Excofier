import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { createRoot } from 'react-dom/client';

// Crear el root
const container = document.getElementById('app');
const root = createRoot(container);

// Renderiza el componente App en el root
root.render(<App tab="home" />);