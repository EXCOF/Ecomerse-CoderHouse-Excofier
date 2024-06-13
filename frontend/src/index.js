import React from 'react'; // Importa React
import ReactDOM from 'react-dom'; // Importa ReactDOM
import App from './App'; // Importa el componente principal App
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS
import './style.css'; // Importa los estilos CSS personalizados

// Renderiza el componente App en el elemento con id 'root'
ReactDOM.render(<App />, document.getElementById('root'));