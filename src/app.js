import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem('carrito')) || []);

  useEffect(() => {
    fetch('/api/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al cargar los productos:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (idProducto) => {
    const producto = productos.find(p => p.id === idProducto);
    if (producto) {
      setCarrito([...carrito, producto]);
    }
  };

  const quitarDelCarrito = (idProducto) => {
    setCarrito(carrito.filter(p => p.id !== idProducto));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const calcularTotalCarrito = () => {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
  };

  return (
    <div className="App">
      <header>
        <h1>GameHouse</h1>
        <img src="images/icon2.png" alt="Logotipo de GameHouse" />
        <input type="text" id="buscador" placeholder="Buscar producto..." />
      </header>
      <main>
        <section id="productos">
          <h1>Productos</h1>
          <div id="filtros">
            <button onClick={() => setProductos(productos)}>Todos</button>
            <button onClick={() => setProductos(productos.filter(p => p.categoria === "Consolas"))}>Consolas</button>
            <button onClick={() => setProductos(productos.filter(p => p.categoria === "PC"))}>PC</button>
            <button onClick={() => setProductos(productos.filter(p => p.categoria === "Accesorios"))}>Accesorios</button>
          </div>
          <ul id="listaProductos">
            {productos.map(producto => (
              <li key={producto.id}>
                <h3>{producto.nombre}</h3>
                <img src={producto.imagen} alt={producto.nombre} />
                <p>Precio: ${producto.precio}</p>
                <button onClick={() => agregarAlCarrito(producto.id)}>Agregar al carrito</button>
              </li>
            ))}
          </ul>
        </section>
        <section id="carrito">
          <h3>Carrito</h3>
          <ul id="listaCarrito">
            {carrito.map((producto, index) => (
              <li key={index}>
                {producto.nombre} - ${producto.precio}
                <button onClick={() => quitarDelCarrito(producto.id)}>Quitar del carrito</button>
              </li>
            ))}
          </ul>
          <button onClick={vaciarCarrito}>Vaciar carrito</button>
          <button onClick={() => alert(`Total a pagar: $${calcularTotalCarrito()}`)}>Comprar</button>
        </section>
      </main>
      <footer>
        <div className="footer-top">
          <div className="footer-column">
            <h3>Sobre Nosotros</h3>
            <p>Bienvenido a GameHouse, ¡tu destino definitivo para todo lo relacionado con los videojuegos! Ya seas un jugador casual, un gamer hardcore o algo intermedio, tenemos todo lo que necesitas para mejorar tu experiencia de juego. Desde las últimas consolas y accesorios hasta una amplia selección de juegos de todos los géneros, estamos aquí para alimentar tu pasión por los videojuegos. ¡Sumérgete en nuestro mundo y que comiencen los juegos!</p>
          </div>
          <div className="footer-column">
            <h3>Enlaces Rápidos</h3>
            <ul>
              <li><a href="#">Inicio</a></li>
              <li><a href="#">Productos</a></li>
              <li><a href="#">Sobre Nosotros</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Contacto</h3>
            <p>Calle 123</p>
            <p>Ciudad, País</p>
            <p>Email: info@gamehouse.com</p>
            <p>Teléfono: +123-456-7890</p>
          </div>
          <div className="footer-column">
            <h3>Síguenos</h3>
            <ul className="social-icons">
              <li><a href="https://www.facebook.com"><img src="images/face.png" alt="Facebook" /></a></li>
              <li><a href="https://twitter.com"><img src="images/x.jpg" alt="Twitter" /></a></li>
              <li><a href="https://www.instagram.com"><img src="images/insta.jpg" alt="Instagram" /></a></li>
              <li><a href="https://www.linkedin.com"><img src="images/linkedin.png" alt="LinkedIn" /></a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2024 GameHouse | Diseñado por Excofier Santiago
        </div>
      </footer>
    </div>
  );
}

export default App;