import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot desde 'react-dom/client'
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function AppWithCallbackAfterRender() {
  useEffect(() => {
    console.log('El componente se ha renderizado');
  }, []);

  return <App />;
}

const container = document.getElementById('App'); // Asegúrate de que el ID sea 'app'
const root = createRoot(container); // Utiliza createRoot desde 'react-dom/client'
root.render(<AppWithCallbackAfterRender />);