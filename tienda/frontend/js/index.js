// Lógica de la página principal: muestra la lista de productos

// Pide los productos al servidor
async function obtenerProductos() {
  try {
    const respuesta = await fetch('/api/productos');
    const productos = await respuesta.json();
    return productos;
  } catch (error) {
    console.log('Error al obtener productos:', error.message);
    return [];
  }
}

// Crea la tarjeta HTML de un producto
function crearTarjetaProducto(producto) {
  const tarjeta = document.createElement('div');
  tarjeta.className = 'tarjeta';

  tarjeta.innerHTML =
    '<h3>' + producto.nombre + '</h3>' +
    '<p class="precio">$' + producto.precio + '</p>' +
    '<a class="boton" href="producto.html?id=' + producto._id + '">Ver detalle</a>';

  return tarjeta;
}

async function mostrarProductos() {
  const contenedor = document.querySelector('#lista-productos');
  const productos = await obtenerProductos();

  if (productos.length === 0) {
    contenedor.innerHTML = '<p>No hay productos disponibles.</p>';
    return;
  }

  for (let i = 0; i < productos.length; i++) {
    const tarjeta = crearTarjetaProducto(productos[i]);
    contenedor.appendChild(tarjeta);
  }
}

mostrarProductos();
