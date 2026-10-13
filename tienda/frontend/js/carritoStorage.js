function obtenerCarrito() {
  const carritoTexto = localStorage.getItem('carrito');

  if (!carritoTexto) {
    return [];
  }

  return JSON.parse(carritoTexto);
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarContadorCarrito();
}

function agregarAlCarrito(producto) {
  const carrito = obtenerCarrito();

  let productoEnCarrito = null;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === producto._id) {
      productoEnCarrito = carrito[i];
    }
  }

  if (productoEnCarrito) {
    productoEnCarrito.cantidad = productoEnCarrito.cantidad + 1;
  } else {
    carrito.push({
      id: producto._id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
}

function quitarDelCarrito(id) {
  const carrito = obtenerCarrito();
  const carritoNuevo = [];

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id !== id) {
      carritoNuevo.push(carrito[i]);
    }
  }

  guardarCarrito(carritoNuevo);
}

function vaciarCarrito() {
  guardarCarrito([]);
}

function calcularPrecioTotal() {
  const carrito = obtenerCarrito();
  let precioTotal = 0;

  for (let i = 0; i < carrito.length; i++) {
    precioTotal = precioTotal + carrito[i].precio * carrito[i].cantidad;
  }

  return precioTotal;
}

function mostrarContadorCarrito() {
  const carrito = obtenerCarrito();
  let cantidadTotal = 0;

  for (let i = 0; i < carrito.length; i++) {
    cantidadTotal = cantidadTotal + carrito[i].cantidad;
  }

  const contador = document.querySelector('#contador-carrito');
  if (contador) {
    contador.textContent = cantidadTotal;
  }
}

mostrarContadorCarrito();
