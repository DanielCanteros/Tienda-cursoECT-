function mostrarCarrito() {
  const contenedor = document.querySelector('#lista-carrito');
  const textoTotal = document.querySelector('#precio-total');
  const formulario = document.querySelector('#formulario-pedido');
  const carrito = obtenerCarrito();

  contenedor.innerHTML = '';

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p>Tu carrito está vacío.</p>';
    textoTotal.textContent = '';
    formulario.style.display = 'none';
    return;
  }

  formulario.style.display = 'block';

  for (let i = 0; i < carrito.length; i++) {
    const producto = carrito[i];
    const subtotal = producto.precio * producto.cantidad;

    const fila = document.createElement('div');
    fila.className = 'fila-carrito';
    fila.innerHTML =
      '<span class="fila-nombre">' + producto.nombre + '</span>' +
      '<span>' + producto.cantidad + ' x $' + producto.precio + '</span>' +
      '<span class="fila-subtotal">$' + subtotal + '</span>';

    const botonQuitar = document.createElement('button');
    botonQuitar.textContent = 'Quitar';
    botonQuitar.className = 'boton boton-peligro';
    botonQuitar.addEventListener('click', function () {
      quitarDelCarrito(producto.id);
      mostrarCarrito();
    });

    fila.appendChild(botonQuitar);
    contenedor.appendChild(fila);
  }

  textoTotal.textContent = 'Total: $' + calcularPrecioTotal();
}

function armarItemsDelPedido() {
  const carrito = obtenerCarrito();
  const items = [];

  for (let i = 0; i < carrito.length; i++) {
    items.push({
      productoId: carrito[i].id,
      cantidad: carrito[i].cantidad
    });
  }

  return items;
}

async function enviarPedido(evento) {
  evento.preventDefault();

  const mensaje = document.querySelector('#mensaje-pedido');
  const nombreCliente = document.querySelector('#nombre').value;
  const emailCliente = document.querySelector('#email').value;

  const pedido = {
    nombreCliente: nombreCliente,
    emailCliente: emailCliente,
    items: armarItemsDelPedido()
  };

  try {
    const respuesta = await fetch('/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    });

    if (!respuesta.ok) {
      mensaje.textContent = 'No se pudo hacer el pedido. Intenta de nuevo.';
      return;
    }

    vaciarCarrito();
    document.querySelector('#nombre').value = '';
    document.querySelector('#email').value = '';
    mostrarCarrito();
    mensaje.textContent = '¡Gracias por tu compra! Tu pedido fue registrado.';
  } catch (error) {
    console.log('Error al enviar el pedido:', error.message);
    mensaje.textContent = 'Error de conexión con el servidor.';
  }
}

document.querySelector('#formulario-pedido').addEventListener('submit', enviarPedido);

mostrarCarrito();
