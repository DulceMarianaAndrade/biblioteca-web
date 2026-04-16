const express = require('express');
const router = express.Router();
const db = require('../db');
const validarProducto = require('../middleware/validarProducto');
const validarMensaje = require('../middleware/validarMensaje');


//GET para listar productos
router.get('/', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
});


//GET por id para mostrar el detalle
router.get('/:id', (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM productos WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results[0]);
  });
});


//POST para agregar producto
router.post('/', validarProducto, (req, res) => {
  const producto = req.body;

  const sql = `
    INSERT INTO productos 
    (nombre, autor, categoria, edicion, precio, stock, imagen, descripcion, disponibilidad)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const valores = [
    producto.nombre,
    producto.autor,
    producto.categoria,
    producto.edicion,
    producto.precio,
    producto.stock,
    producto.imagen,
    producto.descripcion,
    producto.disponibilidad
  ];

  db.query(sql, valores, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({ mensaje: 'Producto creado con éxito' });
  });
});

//POST para guardar mensajes de contacto
router.post('/contacto', validarMensaje, (req, res) => {
  const mensaje = req.body;

  const sql = `
    INSERT INTO mensajes (nombre, correo, asunto, mensaje)
    VALUES (?, ?, ?, ?)
  `;

  const valores = [
    mensaje.nombre,
    mensaje.correo,
    mensaje.asunto,
    mensaje.mensaje
  ];

  db.query(sql, valores, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({ mensaje: 'Mensaje enviado con éxito' });
  });
});

//PUT para actualizar producto
router.put('/:id', validarProducto, (req, res) => {
  const id = req.params.id;
  const producto = req.body;

  const sql = `
    UPDATE productos SET
    nombre = ?,
    autor = ?,
    categoria = ?,
    edicion = ?,
    precio = ?,
    stock = ?,
    imagen = ?,
    descripcion = ?,
    disponibilidad = ?
    WHERE id = ?
  `;

  const valores = [
    producto.nombre,
    producto.autor,
    producto.categoria,
    producto.edicion,
    producto.precio,
    producto.stock,
    producto.imagen,
    producto.descripcion,
    producto.disponibilidad,
    id
  ];

  db.query(sql, valores, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({ mensaje: 'Producto actualizado correctamente' });
  });
});

//DELETE para borrar un producto
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({ mensaje: 'Producto eliminado correctamente' });
  });
});

//Para vaciar carrito al realizar una compra
router.post('/comprar', (req, res) => {
  const productos = req.body.productos;

  if (!productos || productos.length === 0) {
    return res.status(400).json({ error: 'No hay productos' });
  }

  let errores = [];

  productos.forEach(p => {
    db.query(
      'UPDATE productos SET stock = stock - ? WHERE id = ? AND stock >= ?',
      [p.cantidad, p.id, p.cantidad],
      (err, result) => {
        if (err || result.affectedRows === 0) {
          errores.push(p.id);
        }
      }
    );
  });

  if (errores.length > 0) {
    return res.status(400).json({
      error: 'Algunos productos no tienen stock suficiente',
      productos: errores
    });
  }

  res.json({ mensaje: 'Compra realizada' });
});

module.exports = router;