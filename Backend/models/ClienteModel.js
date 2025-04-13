'use strict'

var conn = require("../config/db-connection"),
  ClienteModel = () => {};

ClienteModel.getAll = (cb) => conn.query("SELECT * FROM cliente", cb);

ClienteModel.post = (data, cb) => {
  conn.query(
    "INSERT INTO public.cliente(numero_cliente, nombre, apellidos, fecha_de_registro, direccion_cliente, rtn, email) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    [
      data.numero_cliente,
      data.nombre,
      data.apellidos,
      data.fecha_de_registro,
      data.direccion_cliente,
      data.rtn, // sigue recibiendo el valor de "rtn" en el JSON
      data.email,
    ],
    (err, result) => {
      if (err) {
        console.error("Error en la consulta SQL:", err);
        cb(err, null);
      } else {
        cb(null, result);
      }
    }
  );
};

ClienteModel.delete = (id, cb) =>
conn.query(
  "DELETE FROM public.cliente WHERE numero_cliente = $1", [id], cb
);

ClienteModel.getById = (numero_cliente, cb) => {
  conn.query(
      "SELECT * FROM public.cliente WHERE numero_cliente = $1", 
      [numero_cliente], 
      (err, result) => {
          if (err) {
              return cb(err, null);
          }
          return cb(null, result.rows[0]);
      }
  );
};

ClienteModel.update = (data, cb) => {
  let sql = `
      UPDATE public.cliente 
      SET 
          nombre = $2, 
          apellidos = $3, 
          fecha_de_registro = $4, 
          direccion_cliente = $5, 
          rtn = $6, 
          email = $7
      WHERE numero_cliente = $1
  `;

  conn.query(sql, [
      data.numero_cliente,
      data.nombre,
      data.apellidos,
      data.fecha_de_registro,
      data.direccion_cliente,
      data.rtn,
      data.email
  ], cb);
};

module.exports = ClienteModel;