const validarMensaje = (req, res, next) => {
  const { nombre, correo, mensaje } = req.body;
  if (!nombre || !correo || !mensaje) {
    return res.status(400).json({
      error: 'Todos los campos son obligatorios'
    });
  }
  //validar email
  if (!correo.includes('@')) {
    return res.status(400).json({
      error: 'Correo inválido'
    });
  }
  next();
};

module.exports = validarMensaje;