function obtenerIdDeLaUrl() {
  const parametros = new URLSearchParams(window.location.search);
  return parametros.get('id');
}

async function obtenerProducto(id) {
  try {
    const respuesta = await fetch('/api/productos/' + id);

    if (!respuesta.ok) {
      return null;
    }

    const producto = await respuesta.json();
    return producto;
  } catch (error) {
    console.log('Error al obtener el producto:', error.message);
    return null;
  }
}

async function mostrarProducto() {
  const contenedor = document.querySelector('#detalle-producto');
  const id = obtenerIdDeLaUrl();
  const producto = await obtenerProducto(id);

  if (!producto) {
    contenedor.innerHTML = '<p>Producto no encontrado.</p>';
    return;
  }

  contenedor.innerHTML =
    '<div class="detalle-info">' +
      '<h2>' + producto.nombre + '</h2>' +
      '<p>' + producto.descripcion + '</p>' +
      '<p class="precio">$' + producto.precio + '</p>' +
      '<button id="boton-agregar" class="boton">Agregar al carrito</button>' +
      '<p id="mensaje-agregado" class="mensaje"></p>' +
    '</div>';

  const botonAgregar = document.querySelector('#boton-agregar');
  botonAgregar.addEventListener('click', function () {
    agregarAlCarrito(producto);
    document.querySelector('#mensaje-agregado').textContent = 'Producto agregado al carrito';
  });
}

mostrarProducto();
