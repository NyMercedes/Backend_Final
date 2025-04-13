"use strict"

var conn = require("../config/db-connection"),
  PagoModel = () => {};

PagoModel.getAll = (cb) => conn.query("SELECT * FROM pago", cb); //cb callback function

PagoModel.post = (data, cb) => 

    conn.query( "INSERT INTO public.pago(numero_de_pago, fecha_de_pago, monto_de_pago, tipo_de_pago, numero_de_pedido, empresa) VALUES ($1,$2,$3,$4,$5,$6)",
     [  
       data.numero_de_pago,
       data.fecha_de_pago,   
       data.monto_de_pago,
       data.tipo_de_pago,
       data.numero_de_pedido,
       data.empresa
     ],
     cb);

PagoModel.delete = (id, cb) =>
  conn.query(
    "delete from public.pago where numero_de_pago = $1", [id], cb
    ); 

PagoModel.getById = (numero_de_pago, cb) => {
    conn.query(
        "SELECT * FROM public.pago WHERE numero_de_pago = $1", 
        [numero_de_pago], 
        (err, result) => {
            if (err) {
                return cb(err, null); // Pasamos el error si ocurre
            }
            return cb(null, result.rows[0]); // Devolvemos el primer resultado si existe
        }
    );
};

PagoModel.update = (data, cb) => {
  let sql = `
      UPDATE public.pago 
      SET 
          fecha_de_pago = $2, 
          monto_de_pago = $3, 
          tipo_de_pago = $4, 
          numero_de_pedido = $5, 
          empresa = $6
      WHERE numero_de_pago = $1
  `;

  conn.query(sql, [
      data.numero_de_pago,
      data.fecha_de_pago,   
      data.monto_de_pago,
      data.tipo_de_pago,
      data.numero_de_pedido,
      data.empresa
  ], cb);
};

module.exports = PagoModel;