const mongoose = require('mongoose');

const itemPedidoSchema = new mongoose.Schema({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  cantidad: {
    type: Number,
    required: true,
    min: 1
  }
});

const pedidoSchema = new mongoose.Schema({
  nombreCliente: {
    type: String,
    required: true
  },
  emailCliente: {
    type: String,
    required: true
  },
  items: [itemPedidoSchema],
  precioTotal: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

const Pedido = mongoose.model('Pedido', pedidoSchema);

module.exports = Pedido;
