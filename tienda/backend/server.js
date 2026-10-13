require('dotenv').config();

require('dns').setServers(['8.8.8.8']);

const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const rutasProductos = require('./routes/productos');
const rutasPedidos = require('./routes/pedidos');

const app = express();
const PUERTO = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.use('/api/productos', rutasProductos);
app.use('/api/pedidos', rutasPedidos);

async function iniciarServidor() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB');

    app.listen(PUERTO, () => {
      console.log('Servidor corriendo en http://localhost:' + PUERTO);
    });
  } catch (error) {
    console.log('No se pudo conectar a MongoDB:', error.message);
  }
}

iniciarServidor();
