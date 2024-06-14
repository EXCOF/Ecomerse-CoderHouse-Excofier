import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Asegúrate de que esta importación use mayúsculas
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
reportWebVitals();