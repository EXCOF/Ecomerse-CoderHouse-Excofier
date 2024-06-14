import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function AppWithCallbackAfterRender() {
  useEffect(() => {
    console.log('El componente se ha renderizado');
  }, []);

  return <App />;
}

const container = document.getElementById('app');
const root = createRoot(container);
ReactDOM.render(<AppWithCallbackAfterRender />, document.getElementById('root'));