const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

//Rutas que se van a utilizar
const productosRoutes = require('./routes/productos');
app.use('/api/productos', productosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});