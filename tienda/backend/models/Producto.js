const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    default: ''
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  }
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
