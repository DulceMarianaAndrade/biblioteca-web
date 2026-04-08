const validarProducto = (req, res, next) => {
  const { nombre, precio, stock } = req.body;

  //validar campos vacíos
  if (!nombre || !precio || !stock) {
    return res.status(400).json({
      error: 'Nombre, precio y stock son obligatorios'
    });
  }

  //validar precio
  if (precio <= 0) {
    return res.status(400).json({
      error: 'El precio debe ser mayor a 0'
    });
  }

  //validar stock
  if (stock < 0) {
    return res.status(400).json({
      error: 'El stock no puede ser negativo'
    });
  }

  next(); // TODO OK, sigue al endpoint
};

module.exports = validarProducto;