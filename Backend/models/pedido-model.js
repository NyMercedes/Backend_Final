"use strict"

var conn = require("../config/db-connection"),
  PedidoModel = () => {};

PedidoModel.getAll = (cb) => conn.query("SELECT * FROM pedido", cb); //cb callback funciton

PedidoModel.post = (data, cb) => 

  conn.query( "INSERT INTO public.pedido(numero_pedido, numero_cliente, empresa, fecha_pedido, direccion, tipo_pago, monto_total) VALUES ($1,$2,$3,$4,$5,$6,$7)",
   [  
     data.numero_pedido,
     data.numero_cliente,   
     data.empresa,
     data.fecha_pedido,
     data.direccion,
     data.tipo_pago,
     data.monto_total
   ],
   cb);

PedidoModel.delete = (id, cb) =>
conn.query(
  "delete from public.pedido where numero_pedido = $1", [id], cb
  );

PedidoModel.getById = (numero_pedido, cb) => {
  conn.query(
      "SELECT * FROM public.pedido WHERE numero_pedido = $1", 
      [numero_pedido], 
      (err, result) => {
          if (err) {
              return cb(err, null); // Pasamos el error si ocurre
          }
          return cb(null, result.rows[0]); // Devolvemos el primer resultado si existe
      }
  );
};

PedidoModel.update = (data, cb) => {
  let sql = `
      UPDATE public.pedido 
      SET 
          numero_cliente = $2, 
          empresa = $3, 
          fecha_pedido = $4, 
          direccion = $5, 
          tipo_pago = $6, 
          monto_total = $7
      WHERE numero_pedido = $1
  `;

  conn.query(sql, [
      data.numero_pedido,
      data.numero_cliente,   
      data.empresa,
      data.fecha_pedido,
      data.direccion,
      data.tipo_pago,
      data.monto_total
  ], cb);
};

module.exports = PedidoModel;
