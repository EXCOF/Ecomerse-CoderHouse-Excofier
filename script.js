// Definir un array de productos
const productos = [
  { id: 1, nombre: "Play 5", precio: 100, imagen: "images/play5.jpg" },
  { id: 2, nombre: "Xbox X", precio: 200, imagen: "images/xbox_x.jpg" },
  { id: 3, nombre: "PC Gamer", precio: 300, imagen: "images/pcgamer.png" },
];

// Inicializar el carrito de compras como un array vacío
let carrito = [];

// Función para mostrar los productos en la lista
function mostrarProductos() {
  const listaProductos = document.getElementById("listaProductos");
  listaProductos.innerHTML = ""; // Limpiar la lista antes de agregar nuevos elementos

  productos.forEach((producto) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <p>Precio: $${producto.precio}</p>
      <button data-id="${producto.id}">Agregar al carrito</button>
    `;

    // Agregar evento click al botón "Agregar al carrito"
    li.querySelector("button").addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });

    listaProductos.appendChild(li);
  });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
  const producto = productos.find((producto) => producto.id === idProducto);
  if (producto) {
    carrito.push(producto);
    mostrarCarrito();
  } else {
    console.error("Producto no encontrado");
  }
}

// Función para mostrar el contenido del carrito
function mostrarCarrito() {
  const listaCarrito = document.getElementById("listaCarrito");
  listaCarrito.innerHTML = "";

  carrito.forEach((producto) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${producto.nombre} - $${producto.precio}
      <button data-id="${producto.id}">Quitar del carrito</button>
    `;

    // Agregar evento click al botón "Quitar del carrito"
    li.querySelector("button").addEventListener("click", () => {
      quitarDelCarrito(producto.id);
    });

    listaCarrito.appendChild(li);
  });
}

// Función para calcular el total
function calcularTotalCarrito() {
  return carrito.reduce((total, producto) => total + producto.precio, 0);
}

// Función para quitar un producto del carrito
function quitarDelCarrito(idProducto) {
  carrito = carrito.filter((producto) => producto.id !== idProducto);
  mostrarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
  carrito = [];
  mostrarCarrito();
}

// Función para mostrar un mensaje en una ventana modal similar a "modalGracias"
function mostrarMensajeModal(mensaje) {
  const modal = document.getElementById("modalMensaje");
  modal.innerHTML = `
    <p>${mensaje}</p>
    <button id="btnCerrarMensaje">Cerrar</button>
  `;
  modal.style.display = "block";
  document.getElementById("btnCerrarMensaje").addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// Función para mostrar el total a pagar en el modal
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
    
    // Actualizar el contenido del elemento <h2> con el total a pagar
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

// Función para validar los datos de compra
function validarDatosCompra(nombre, numeroTarjeta, dni, telefono) {
  return (
    nombre.trim() !== "" &&
    validarDNI(dni) &&
    validarTelefono(telefono) &&
    validarNumeroTarjeta(numeroTarjeta)
  );
}

// Función para validar el número de tarjeta
function validarNumeroTarjeta(numeroTarjeta) {
  return /^\d{16}$/.test(numeroTarjeta);
}

// Función para validar el DNI
function validarDNI(dni) {
  return /^\d{8}$/.test(dni);
}

// Función para validar el número de teléfono
function validarTelefono(telefono) {
  return /^\d{10,14}$/.test(telefono);
}

// Función para mostrar la ventana "modalGracias"
function mostrarModalGracias(nombre) {
  const modalGracias = document.getElementById("modalGracias");
  modalGracias.innerHTML = `
    <h2>¡Gracias por tu compra, ${nombre}!</h2>
    <p>Tu pedido se ha procesado correctamente.</p>
    <button id="btnCerrarGracias">Cerrar</button>
  `;
  modalGracias.style.display = "block";
  document.getElementById("btnCerrarGracias").addEventListener("click", () => {
    modalGracias.style.display = "none";
  });
  carrito = [];
  mostrarCarrito();
}
//Funcion para procesar la compra
function procesarCompra(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const numeroTarjeta = document.getElementById("numeroTarjeta").value;
  const dni = document.getElementById("dni").value;
  const telefono = document.getElementById("telefono").value;

  if (validarDatosCompra(nombre, numeroTarjeta, dni, telefono)) {
    mostrarMensajeModal(`¡Gracias por tu compra, ${nombre}! Tu pedido se ha procesado correctamente.`);
    document.getElementById("modalCompra").style.display = "none";
  } else {
    mostrarMensajeModal("Por favor, completa correctamente todos los campos del formulario.");
  }
}

// Inicializar eventos y mostrar productos
document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
  document.getElementById("btnVaciarCarrito").addEventListener("click", vaciarCarrito);
  document.getElementById("btnComprar").addEventListener("click", mostrarTotalEnModal);
  document.getElementById("formularioCompra").addEventListener("submit", procesarCompra);
});