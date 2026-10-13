const express = require('express');
const Producto = require('../models/Producto');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    console.log('Error al obtener productos:', error.message);
    res.status(500).json({ mensaje: 'Error al obtener los productos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    console.log('Error al obtener el producto:', error.message);
    res.status(400).json({ mensaje: 'El id del producto no es válido' });
  }
});

module.exports = router;
