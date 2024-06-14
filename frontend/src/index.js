import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
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

const container = document.getElementById('App');
const root = createRoot(container); // Utiliza createRoot desde 'react-dom/client'
root.render(<AppWithCallbackAfterRender />);