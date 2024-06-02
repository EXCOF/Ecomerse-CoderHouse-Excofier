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
  let total = 0;
  for (const producto of carrito) {
    total += producto.precio; // Se suma el precio de cada producto al total
  }
  return total;
}

// Función para quitar un producto del carrito
function quitarDelCarrito(idProducto) {
  const index = carrito.findIndex((producto) => producto.id === idProducto);
  if (index !== -1) {
    carrito.splice(index, 1);
    mostrarCarrito();
  } else {
    console.error("Producto no encontrado en el carrito");
  }
}

// Función para vaciar el carrito
function vaciarCarrito() {
  carrito = [];
  mostrarCarrito();
}

// Eventos para los botones "Vaciar carrito" y "Comprar"
const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");
const btnComprar = document.getElementById("btnComprar");

btnVaciarCarrito.addEventListener("click", vaciarCarrito);

btnComprar.addEventListener("click", mostrarTotalEnModal);

// Función para mostrar el total del carrito en una ventana modal
function mostrarTotalEnModal() {
  if (carrito.length > 0) {
    const total = calcularTotalCarrito();
    const modal = document.getElementById("modalTotal"); // Crea un nuevo modal para mostrar el total
    modal.innerHTML = `
      <h2>Total a pagar: $${total}</h2>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          ${carrito.map((producto) => `
            <tr>
              <td>${producto.nombre}</td>
              <td>$${producto.precio}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <button id="btnContinuarCompra">Continuar compra</button>
      <button id="btnCancelarCompra">Cancelar</button>
    `;
    modal.style.display = "block";

    // Agregar eventos a los botones del modal
    const btnContinuarCompra = document.getElementById("btnContinuarCompra");
    btnContinuarCompra.addEventListener("click", () => {
      // Mostrar el formulario de compra
      const modalCompra = document.getElementById("modalCompra");
      modalCompra.style.display = "block";
      modal.style.display = "none"; // Cerrar el modal del total
    });

    const btnCancelarCompra = document.getElementById("btnCancelarCompra");
    btnCancelarCompra.addEventListener("click", () => {
      modal.style.display = "none"; // Cerrar el modal del total
    });
  } else {
    alert("Tu carrito está vacío. Agrega productos para realizar una compra.");
  }
}

// Función para validar los datos de compra
function validarDatosCompra(nombre, numeroTarjeta, dni, telefono) {

  return (
    nombre.trim() !== "" &&
    validarDNI(dni) && // La validación del DNI
    validarTelefono(telefono) && // La validación del teléfono
    validarNumeroTarjeta(numeroTarjeta) // La validación del número de tarjeta
  );
}

// Función para validar el número de tarjeta
function validarNumeroTarjeta(numeroTarjeta) {
  // Validación del número de tarjeta
  if (numeroTarjeta.length !== 16) {
    return false; // Número de tarjeta inválido por longitud
  }

  if (isNaN(numeroTarjeta)) {
    return false; // Número de tarjeta inválido por formato
  }

  return true;
}

// Función para validar el DNI 
function validarDNI(dni) {
  // Validación del DNI 
  if (dni.length !== 8) {
    return false; // DNI inválido por longitud
  }

  if (isNaN(dni)) {
    return false; // DNI inválido por formato
  }

  // Cálculo del dígito verificador
  const digitos = dni.substring(0, 7);
  let suma = 0;
  for (let i = 0; i < digitos.length; i++) {
    suma += parseInt(digitos[i]) * (2 + i % 2);
  }

  const resto = suma % 11;
  const digitoVerificador = resto === 0 ? 0 : 11 - resto;

  return parseInt(dni[7]) === digitoVerificador;
}

// Función para validar el número de teléfono
function validarTelefono(telefono) {
  // Validación del número de teléfono
  if (telefono.length < 10 || telefono.length > 14) {
    return false; // Número de teléfono inválido por longitud
  }

  if (isNaN(telefono)) {
    return false; // Número de teléfono inválido por formato
  }

  return true;
}

// Mostrar los productos en la lista
mostrarProductos();


// Función para mostrar la ventana "modalGracias"
function mostrarModalGracias() {
  const modalGracias = document.getElementById("modalGracias");

  // Conseguir el nombre escrito por el usuario
  const nombre = document.getElementById("nombre").value;

  // Agregar el nombre escrito por el usuario en el mensaje de ModalGracias
  modalGracias.innerHTML = `
    <h2>¡Gracias por tu compra, ${nombre}!</h2>
    <p>Tu pedido se ha procesado correctamente.</p>
    <button id="btnCerrarGracias">Cerrar</button>
  `;

  modalGracias.style.display = "block";

  // Agregar listener al botón "Cerrar"
  const btnCerrarGracias = document.getElementById("btnCerrarGracias");
  btnCerrarGracias.addEventListener("click", cerrarModalGracias);

  // Cerrar el formulario de compra
  const modalCompra = document.getElementById("modalCompra");
  modalCompra.style.display = "none";

  // Restablecer el carrito
  carrito = [];
  mostrarCarrito();

}

// Función para cerrar la ventana "modalGracias"
function cerrarModalGracias() {
  const modalGracias = document.getElementById("modalGracias");
  modalGracias.style.display = "none";
}


// Agregar listener al botón "Confirmar Compra"
const btnConfirmarCompra = document.getElementById("formularioCompra").querySelector("button");
btnConfirmarCompra.addEventListener("click", mostrarModalGracias);





// Función para simular la compra
function comprar() {
  if (carrito.length > 0) {
    // Mostrar formulario modal
    const modal = document.getElementById("modalCompra");
    modal.style.display = "block";

    // Validar datos del formulario antes de enviar
    const formularioCompra = document.getElementById("formularioCompra");
    formularioCompra.addEventListener("submit", (event) => {
      event.preventDefault(); // Evitar el envío automático del formulario

      const nombre = document.getElementById("nombre").value;
      const numeroTarjeta = document.getElementById("numeroTarjeta").value;
      const dni = document.getElementById("dni").value;
      const telefono = document.getElementById("telefono").value;

      if (validarDatosCompra(nombre, numeroTarjeta, dni, telefono)) {
        // Mostrar modal de compra completada
        const modalGracias = document.getElementById("modalGracias");
        modalGracias.style.display = "block";
      } else {
        alert("Los datos ingresados no son válidos. Por favor, revisa e intenta nuevamente.");
      }
    });
  } else {
    alert("Tu carrito está vacío. Agrega productos para realizar una compra.");
  }
}

// Agregar evento al botón "Comprar" para mostrar el total en modal
const btnCompra = document.getElementById("btnComprar");
btnCompra.addEventListener("click", mostrarTotalEnModal);