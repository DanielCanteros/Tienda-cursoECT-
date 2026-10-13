const express = require('express');
const Producto = require('../models/Producto');
const Pedido = require('../models/Pedido');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const nombreCliente = req.body.nombreCliente;
    const emailCliente = req.body.emailCliente;
    const itemsRecibidos = req.body.items;

    if (!nombreCliente || !emailCliente) {
      return res.status(400).json({ mensaje: 'Falta el nombre o el email del cliente' });
    }
    if (!itemsRecibidos || itemsRecibidos.length === 0) {
      return res.status(400).json({ mensaje: 'El pedido no tiene productos' });
    }

    const items = [];
    let precioTotal = 0;

    for (let i = 0; i < itemsRecibidos.length; i++) {
      const itemRecibido = itemsRecibidos[i];
      const producto = await Producto.findById(itemRecibido.productoId);

      if (!producto) {
        return res.status(400).json({ mensaje: 'Uno de los productos no existe' });
      }

      items.push({
        producto: producto._id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: itemRecibido.cantidad
      });

      precioTotal = precioTotal + producto.precio * itemRecibido.cantidad;
    }

    const pedidoNuevo = new Pedido({
      nombreCliente: nombreCliente,
      emailCliente: emailCliente,
      items: items,
      precioTotal: precioTotal
    });

    const pedidoGuardado = await pedidoNuevo.save();
    res.status(201).json(pedidoGuardado);
  } catch (error) {
    console.log('Error al crear el pedido:', error.message);
    res.status(500).json({ mensaje: 'Error al crear el pedido' });
  }
});

module.exports = router;
