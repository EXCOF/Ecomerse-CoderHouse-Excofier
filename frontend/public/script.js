// Inicializa la lista de productos y el carrito
let productos = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Guarda el carrito en LocalStorage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Muestra los productos en la lista
function mostrarProductos(filtroCategoria = "") {
  const listaProductos = document.getElementById("listaProductos");
  listaProductos.innerHTML = "";

  const productosAMostrar = filtroCategoria === "" ? productos : productos.filter(producto => producto.categoria === filtroCategoria);

  productosAMostrar.forEach((producto) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <p>Precio: $${producto.precio}</p>
      <button data-id="${producto.id}">Agregar al carrito</button>
    `;
    li.querySelector("button").addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });
    listaProductos.appendChild(li);
  });
}

// Filtra productos por categoría
function filtrarPorCategoria(categoria) {
  mostrarProductos(categoria);
}

// Agrega un producto al carrito
function agregarAlCarrito(idProducto) {
  const producto = productos.find((producto) => producto.id === idProducto);
  if (producto) {
    carrito.push(producto);
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
  } else {
    mostrarMensajeModal("El producto seleccionado no se encuentra disponible.");
  }
}

// Muestra los productos en el carrito
function mostrarCarrito() {
  const listaCarrito = document.getElementById("listaCarrito");
  listaCarrito.innerHTML = "";

  carrito.forEach((producto) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${producto.nombre} - $${producto.precio}
      <button data-id="${producto.id}">Quitar del carrito</button>
    `;
    li.querySelector("button").addEventListener("click", () => {
      quitarDelCarrito(producto.id);
    });
    listaCarrito.appendChild(li);
  });
}

// Quita un producto del carrito
function quitarDelCarrito(idProducto) {
  const index = carrito.findIndex((producto) => producto.id === idProducto);
  if (index !== -1) {
    carrito.splice(index, 1);
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
  } else {
    mostrarMensajeModal("El producto seleccionado no se encuentra en el carrito.");
  }
}

// Vacía el carrito completamente
function vaciarCarrito() {
  carrito = [];
  guardarCarritoEnLocalStorage();
  mostrarCarrito();
}

// Calcula el total del carrito
function calcularTotalCarrito() {
  return carrito.reduce((total, producto) => total + producto.precio, 0);
}

// Muestra el total del carrito en un modal
function mostrarTotalEnModal() {
  if (carrito.length > 0) {
    const total = calcularTotalCarrito();
    const modal = document.getElementById("modalTotal");
    const detalleCarrito = document.getElementById("detalleCarrito");
    detalleCarrito.innerHTML = carrito.map((producto) => `
      <tr>
        <td>${producto.nombre}</td>
        <td>$${producto.precio}</td>
      </tr>
    `).join('');
    modal.querySelector("h2").innerText = `Total a pagar: $${total.toFixed(2)}`;
    modal.style.display = "block";
    document.getElementById("btnContinuarCompra").addEventListener("click", () => {
      document.getElementById("modalCompra").style.display = "block";
      modal.style.display = "none";
    });
    document.getElementById("btnCancelarCompra").addEventListener("click", () => {
      modal.style.display = "none";
    });
  } else {
    mostrarMensajeModal("Tu carrito está vacío. Agrega productos para realizar una compra.");
  }
}

// Valida los datos del formulario de compra
function validarDatosCompra(nombre, numeroTarjeta, dni, telefono) {
  return (
    nombre.trim() !== "" && // El nombre no puede estar vacío
    validarDNI(dni) && // Validar el formato del DNI
    validarTelefono(telefono) && // Validar el formato del número de teléfono
    validarNumeroTarjeta(numeroTarjeta) // Validar el formato del número de tarjeta
  );
}

function validarNumeroTarjeta(numeroTarjeta) {
  return /^\d{16}$/.test(numeroTarjeta);
}

function validarDNI(dni) {
  return /^\d{8}$/.test(dni);
}

function validarTelefono(telefono) {
  return /^\d{10,14}$/.test(telefono);
}

// Muestra un mensaje en un modal
function mostrarMensajeModal(mensaje) {
  const modalMensaje = document.getElementById("modalMensaje");
  const mensajeElement = modalMensaje.querySelector("p");
  const btnCerrarMensaje = modalMensaje.querySelector("#btnCerrarMensaje");
  mensajeElement.textContent = mensaje;
  modalMensaje.style.display = "block";
  btnCerrarMensaje.addEventListener("click", () => {
    modalMensaje.style.display = "none";
  });
}

// Procesa la compra y valida los datos del formulario
function procesarCompra(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const numeroTarjeta = document.getElementById("numeroTarjeta").value;
  const dni = document.getElementById("dni").value;
  const telefono = document.getElementById("telefono").value;

  if (validarDatosCompra(nombre, numeroTarjeta, dni, telefono)) {
    mostrarMensajeModal("¡Gracias por tu compra, " + nombre + "!");
    document.getElementById("modalCompra").style.display = "none";
    carrito = [];
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
    document.getElementById("modalCompra").style.display = "none";
  } else {
    mostrarMensajeModal("Por favor, completa correctamente todos los campos del formulario.");
  }
}

// Busca productos según un término de búsqueda ingresado por el usuario
function buscarProducto() {
  const terminoBusqueda = document.getElementById("buscador").value.toLowerCase();
  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(terminoBusqueda)
  );
  mostrarProductosConFiltro(productosFiltrados);
}

// Muestra los productos filtrados en la lista de productos
function mostrarProductosConFiltro(productosFiltrados) {
  const listaProductos = document.getElementById("listaProductos");
  listaProductos.innerHTML = "";

  productosFiltrados.forEach((producto) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <p>Precio: $${producto.precio}</p>
      <button data-id="${producto.id}">Agregar al carrito</button>
    `;
    li.querySelector("button").addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });
    listaProductos.appendChild(li);
  });
}

// Evento que se ejecuta cuando se carga el contenido de la página
document.addEventListener("DOMContentLoaded", () => {
  fetch('/api/productos')
    .then(response => response.json())
    .then(data => {
      productos = data;
      mostrarProductos();
    })
    .catch(error => console.error('Error al cargar los productos:', error));

  document.getElementById("btnVaciarCarrito").addEventListener("click", vaciarCarrito);
  document.getElementById("btnComprar").addEventListener("click", mostrarTotalEnModal);
  document.getElementById("formularioCompra").addEventListener("submit", procesarCompra);
  document.getElementById("buscador").addEventListener("input", buscarProducto);

  document.getElementById("filtroConsolas").addEventListener("click", () => filtrarPorCategoria("Consolas"));
  document.getElementById("filtroPC").addEventListener("click", () => filtrarPorCategoria("PC"));
  document.getElementById("filtroAccesorios").addEventListener("click", () => filtrarPorCategoria("Accesorios"));
  document.getElementById("filtroTodos").addEventListener("click", () => mostrarProductos());

  mostrarCarrito();
});