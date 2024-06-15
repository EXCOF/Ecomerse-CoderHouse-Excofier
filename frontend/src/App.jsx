import React, { useEffect, useState } from 'react'; // Importa React y hooks de React

const App = () => {
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos

  // Efecto que se ejecuta al montar el componente
  useEffect(() => {
    fetch('/api/productos') // Hace una petición a la API para obtener los productos
      .then(response => response.json()) // Convierte la respuesta a JSON
      .then(data => setProductos(data)) // Actualiza el estado con los datos obtenidos
      .catch(error => console.error('Error al cargar los productos:', error)); // Maneja errores
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-4">Bienvenido a GameHouse</h1>
      <div className="row">
        {productos.map(producto => (
          <div className="col-md-4 mb-4" key={producto.id}>
            <div className="card">
              <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">Precio: ${producto.precio}</p>
                <a href="#" className="btn btn-primary">Agregar al carrito</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App; // Exporta el componente App como predeterminado