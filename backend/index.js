const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

//Rutas que se van a utilizar
const productosRoutes = require('./routes/productos');
app.use('/productos', productosRoutes);

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});