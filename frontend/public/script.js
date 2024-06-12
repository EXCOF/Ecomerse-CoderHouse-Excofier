// Definir un array de productos
let productos = [
  { "id": 1, "nombre": "Play 5", "precio": 100, "imagen": "images/play5.jpg", "categoria": "Consolas" },
{ "id": 2, "nombre": "Xbox X", "precio": 200, "imagen": "images/xbox_x.jpg", "categoria": "Consolas" },
{ "id": 3, "nombre": "PC Gamer", "precio": 300, "imagen": "images/pcgamer.png", "categoria": "PC" },
{ "id": 4, "nombre": "Nintendo Switch", "precio": 250, "imagen": "images/switch.jpg", "categoria": "Consolas" },
{ "id": 5, "nombre": "Headset Gamer", "precio": 50, "imagen": "images/headset.jpg", "categoria": "Accesorios" },
{ "id": 6, "nombre": "Mouse Gamer", "precio": 40, "imagen": "images/mouse.jpg", "categoria": "Accesorios" },
{ "id": 7, "nombre": "Teclado Mecánico", "precio": 70, "imagen": "images/keyboard.jpg", "categoria": "Accesorios" },
{ "id": 8, "nombre": "Monitor 144Hz", "precio": 200, "imagen": "images/monitor.jfif", "categoria": "PC" }
];

// Inicializar el carrito de compras desde el LocalStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para guardar el carrito en el LocalStorage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para mostrar los productos en la lista, opcionalmente filtrados por categoría
function mostrarProductos(filtroCategoria = "") {
  // Obtener el elemento <ul> donde se mostrarán los productos
  const listaProductos = document.getElementById("listaProductos");
  // Limpiar la lista antes de agregar nuevos elementos
  listaProductos.innerHTML = "";

  // Obtener todos los productos si no se proporciona un filtro de categoría
  const productosAMostrar = filtroCategoria === "" ? productos : productos.filter(producto => producto.categoria === filtroCategoria);

  // Mostrar los productos en la lista
  productosAMostrar.forEach((producto) => {
    // Crear un nuevo elemento <li> para cada producto
    const li = document.createElement("li");
    // Agregar HTML para mostrar el nombre, imagen, precio y botón "Agregar al carrito" de cada producto
    li.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <p>Precio: $${producto.precio}</p>
      <button data-id="${producto.id}">Agregar al carrito</button>
    `;

    // Agregar evento click al botón "Agregar al carrito" para llamar a la función agregarAlCarrito
    li.querySelector("button").addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });

    // Agregar el elemento <li> a la lista de productos
    listaProductos.appendChild(li);
  });
}

// Función para filtrar productos por categoría y mostrarlos en la lista de productos
function filtrarPorCategoria(categoria) {
  // Mostrar los productos filtrados por la categoría seleccionada
  mostrarProductos(categoria);
}

// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
  
  // Realiza una solicitud HTTP GET para obtener los datos de productos desde el servidor
  fetch('/api/productos')
    .then(response => response.json()) // Convierte la respuesta a JSON
    .then(data => {
      productos = data; // Almacena los productos obtenidos en la variable 'productos'
      mostrarProductos(); // Llama a la función para mostrar los productos en la página
    })
    .catch(error => console.error('Error al cargar los productos:', error)); // Muestra un mensaje de error si la solicitud falla

  // Añade un evento de clic al botón de filtro "Consolas" para filtrar productos de la categoría "Consolas"
  document.getElementById("filtroConsolas").addEventListener("click", () => filtrarPorCategoria("Consolas"));
  // Añade un evento de clic al botón de filtro "PC" para filtrar productos de la categoría "PC"
  document.getElementById("filtroPC").addEventListener("click", () => filtrarPorCategoria("PC"));
  // Añade un evento de clic al botón de filtro "Accesorios" para filtrar productos de la categoría "Accesorios"
  document.getElementById("filtroAccesorios").addEventListener("click", () => filtrarPorCategoria("Accesorios"));
  // Añade un evento de clic al botón de filtro "Todos" para mostrar todos los productos
  document.getElementById("filtroTodos").addEventListener("click", () => mostrarProductos());
  // Añade un evento de clic al botón "Vaciar carrito" para vaciar el carrito de compras
  document.getElementById("btnVaciarCarrito").addEventListener("click", vaciarCarrito);
  // Añade un evento de clic al botón "Comprar" para mostrar el total del carrito en un modal
  document.getElementById("btnComprar").addEventListener("click", mostrarTotalEnModal);
  // Añade un evento de envío al formulario de compra para procesar la compra cuando se envía el formulario
  document.getElementById("formularioCompra").addEventListener("submit", procesarCompra);
  // Añade un evento de entrada al campo de búsqueda para buscar productos en tiempo real mientras se escribe
  document.getElementById("buscador").addEventListener("input", buscarProducto);
  // Muestra el contenido del carrito en la página al cargar la página
  mostrarCarrito();
});

// Mostrar todos los productos al cargar la página
window.addEventListener("load", mostrarProductos);

// También mostrar todos los productos cuando se reinicia la página
window.addEventListener("beforeunload", mostrarProductos);


// Función para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
  // Encontrar el producto correspondiente al ID proporcionado
  const producto = productos.find((producto) => producto.id === idProducto);
  // Si se encuentra el producto, agregarlo al carrito, guardar en el LocalStorage y mostrar el carrito actualizado
  if (producto) {
    carrito.push(producto);
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
  } else {
    // Si el producto no se encuentra, mostrar un mensaje de error
    mostrarMensajeModal("El producto seleccionado no se encuentra disponible.");
  }
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
  // Obtener el elemento <ul> donde se mostrarán los productos del carrito
  const listaCarrito = document.getElementById("listaCarrito");
  // Limpiar la lista antes de agregar nuevos elementos
  listaCarrito.innerHTML = "";

  // Iterar sobre cada producto en el carrito y mostrarlo en la lista
  carrito.forEach((producto) => {
    // Crear un nuevo elemento <li> para cada producto en el carrito
    const li = document.createElement("li");
    // Agregar HTML para mostrar el nombre, precio y botón "Quitar del carrito" de cada producto
    li.innerHTML = `
      ${producto.nombre} - $${producto.precio}
      <button data-id="${producto.id}">Quitar del carrito</button>
    `;

    // Agregar evento click al botón "Quitar del carrito" para llamar a la función quitarDelCarrito
    li.querySelector("button").addEventListener("click", () => {
      quitarDelCarrito(producto.id);
    });

    // Agregar el elemento <li> a la lista del carrito
    listaCarrito.appendChild(li);
  });
}

// Función para quitar un producto específico del carrito
function quitarDelCarrito(idProducto) {
  // Encontrar el índice del producto en el carrito
  const index = carrito.findIndex((producto) => producto.id === idProducto);
  
  // Verificar si se encontró el producto en el carrito
  if (index !== -1) {
    // Eliminar el producto del carrito usando el índice encontrado
    carrito.splice(index, 1);
    // Guardar el carrito actualizado en el LocalStorage y mostrar el carrito actualizado
    guardarCarritoEnLocalStorage();
    mostrarCarrito();
  } else {
    // Si el producto no se encuentra en el carrito, mostrar un mensaje de error
    mostrarMensajeModal("El producto seleccionado no se encuentra en el carrito.");
  }
}

// Función para vaciar el carrito completamente
function vaciarCarrito() {
  // Vaciar el array del carrito, guardar el carrito vacío en el LocalStorage y mostrar el carrito vacío
  carrito = [];
  guardarCarritoEnLocalStorage();
  mostrarCarrito();
}

// Función para calcular el total de la compra en el carrito
function calcularTotalCarrito() {
  // Reducir el array de productos en el carrito para calcular el total sumando los precios de cada producto
  return carrito.reduce((total, producto) => total + producto.precio, 0);
}

// Función para mostrar el total de la compra en un modal
function mostrarTotalEnModal() {
  if (carrito.length > 0) {
    // Si hay productos en el carrito, calcular el total y mostrarlo en un modal junto con los detalles de los productos
    const total = calcularTotalCarrito();
    const modal = document.getElementById("modalTotal");
    const detalleCarrito = document.getElementById("detalleCarrito");
    detalleCarrito.innerHTML = carrito.map((producto) => `
      <tr>
        <td>${producto.nombre}</td>
        <td>$${producto.precio}</td>
      </tr>
    `).join('');
    
    // Actualizar el contenido del elemento <h2> con el total a pagar
    modal.querySelector("h2").innerText = `Total a pagar: $${total.toFixed(2)}`;
    
    modal.style.display = "block";

    // Agregar eventos a los botones dentro del modal
    document.getElementById("btnContinuarCompra").addEventListener("click", () => {
      document.getElementById("modalCompra").style.display = "block";
      modal.style.display = "none";
    });

    document.getElementById("btnCancelarCompra").addEventListener("click", () => {
      modal.style.display = "none";
    });
  } else {
    // Si el carrito está vacío, mostrar un mensaje indicando que no hay productos en el carrito
    mostrarMensajeModal("Tu carrito está vacío. Agrega productos para realizar una compra.");
  }
}

// Función para validar los datos ingresados en el formulario de compra
function validarDatosCompra(nombre, numeroTarjeta, dni, telefono) {
  return (
    nombre.trim() !== "" && // El nombre no puede estar vacío
    validarDNI(dni) && // Validar el formato del DNI
    validarTelefono(telefono) && // Validar el formato del número de teléfono
    validarNumeroTarjeta(numeroTarjeta) // Validar el formato del número de tarjeta
  );
}

// Función para validar el formato del número de tarjeta
function validarNumeroTarjeta(numeroTarjeta) {
  return /^\d{16}$/.test(numeroTarjeta);
}

// Función para validar el formato del DNI
function validarDNI(dni) {
  return /^\d{8}$/.test(dni);
}

// Función para validar el formato del número de teléfono
function validarTelefono(telefono) {
  return /^\d{10,14}$/.test(telefono);
}

// Función para mostrar un mensaje en un modal
function mostrarMensajeModal(mensaje) {
  const modalMensaje = document.getElementById("modalMensaje");
  const mensajeElement = modalMensaje.querySelector("p");
  const btnCerrarMensaje = modalMensaje.querySelector("#btnCerrarMensaje");
  
  // Establecer el mensaje
  mensajeElement.textContent = mensaje;
  
  // Mostrar el modal
  modalMensaje.style.display = "block";

  // Agregar evento al botón "Cerrar" para ocultar el modal al hacer clic
  btnCerrarMensaje.addEventListener("click", () => {
    modalMensaje.style.display = "none";
  });
}



// Función para procesar la compra, validar los datos del formulario y mostrar el modal de agradecimiento si los datos son válidos
function procesarCompra(event) {
  event.preventDefault();
  // Obtener los valores ingresados en el formulario
  const nombre = document.getElementById("nombre").value;
  const numeroTarjeta = document.getElementById("numeroTarjeta").value;
  const dni = document.getElementById("dni").value;
  const telefono = document.getElementById("telefono").value;

  // Validar los datos ingresados en el formulario
  if (validarDatosCompra(nombre, numeroTarjeta, dni, telefono)) {
    // Si los datos son válidos, mostrar el modal de agradecimiento y ocultar el formulario de compra
    mostrarMensajeModal("¡Gracias por tu compra, " + nombre + "!");
    document.getElementById("modalCompra").style.display = "none";
    carrito = []; // Vaciar el carrito
    guardarCarritoEnLocalStorage(); // Guardar el carrito vacío en el LocalStorage
    mostrarCarrito(); // Mostrar el carrito vacío en la interfaz
    document.getElementById("modalCompra").style.display = "none";
  } else {
    // Si los datos no son válidos, mostrar un mensaje de error indicando que se deben completar correctamente todos los campos del formulario
    mostrarMensajeModal("Por favor, completa correctamente todos los campos del formulario.");
  }
}

// Función para buscar productos según un término de búsqueda ingresado por el usuario
function buscarProducto() {
  // Obtener el término de búsqueda ingresado por el usuario y convertirlo a minúsculas
  const terminoBusqueda = document.getElementById("buscador").value.toLowerCase();
  // Filtrar los productos según el término de búsqueda
  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(terminoBusqueda)
  );
  // Mostrar los productos filtrados en la lista de productos
  mostrarProductosConFiltro(productosFiltrados);
}

// Función para mostrar los productos filtrados en la lista de productos
function mostrarProductosConFiltro(productosFiltrados) {
  const listaProductos = document.getElementById("listaProductos");
  // Limpiar la lista antes de agregar nuevos elementos
  listaProductos.innerHTML = "";

  // Iterar sobre los productos filtrados y mostrarlos en la lista de productos
  productosFiltrados.forEach((producto) => {
    // Crear un nuevo elemento <li> para cada producto
    const li = document.createElement("li");
    // Agregar HTML para mostrar el nombre, imagen, precio y botón "Agregar al carrito" de cada producto
    li.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <p>Precio: $${producto.precio}</p>
      <button data-id="${producto.id}">Agregar al carrito</button>
    `;

    // Agregar evento click al botón "Agregar al carrito" para llamar a la función agregarAlCarrito
    li.querySelector("button").addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });

    // Agregar el elemento <li> a la lista de productos
    listaProductos.appendChild(li);
  });
}

// Función para filtrar productos por categoría y mostrarlos en la lista de productos
function filtrarPorCategoria(categoria) {
  // Mostrar los productos filtrados por la categoría seleccionada
  mostrarProductos(categoria);
}

// Evento que se ejecuta cuando se carga el contenido de la página
document.addEventListener("DOMContentLoaded", () => {
  // Cargar los productos desde un archivo JSON y mostrarlos en la lista de productos
  fetch('productos.json')
    .then(response => response.json())
    .then(data => {
      productos = data;
      mostrarProductos();
    })
    .catch(error => console.error('Error al cargar los productos:', error));

  // Agregar eventos a los botones y formularios de la página
  document.getElementById("btnVaciarCarrito").addEventListener("click", vaciarCarrito);
  document.getElementById("btnComprar").addEventListener("click", mostrarTotalEnModal);
  document.getElementById("formularioCompra").addEventListener("submit", procesarCompra);
  document.getElementById("buscador").addEventListener("input", buscarProducto);

  // Agregar eventos para filtrar productos por categoría
  document.getElementById("filtroConsolas").addEventListener("click", () => filtrarPorCategoria("Consolas"));
  document.getElementById("filtroPC").addEventListener("click", () => filtrarPorCategoria("PC"));
  document.getElementById("filtroAccesorios").addEventListener("click", () => filtrarPorCategoria("Accesorios"));
  document.getElementById("filtroTodos").addEventListener("click", () => mostrarProductos());

  // Mostrar el carrito cargado desde el LocalStorage al cargar la página
  mostrarCarrito();
});