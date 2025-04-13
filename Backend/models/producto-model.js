"use strict"

var conn = require("../config/db-connection"),
  ProductoModel = () => {};

ProductoModel.getAll = (cb) => conn.query("SELECT * FROM producto", cb); //cb callback funciton

ProductoModel.post = (data, cb) => 

  conn.query( "INSERT INTO public.producto(numero_pedido, nombre_articulo, precio_unitario, fecha_pedido, cantidad_articulo, monto_total, aplica_impuesto) VALUES ($1,$2,$3,$4,$5,$6,$7)",
   [  
     data.numero_pedido,
     data.nombre_articulo,   
     data.precio_unitario,
     data.fecha_pedido,
     data.cantidad_articulo,
     data.monto_total,
     data.aplica_impuesto
   ],
   cb);

ProductoModel.delete = (id, cb) =>
conn.query(
  "delete from public.producto where numero_pedido = $1", [id], cb
  );

ProductoModel.getById = (numero_pedido, cb) => {
    conn.query(
        "SELECT * FROM public.producto WHERE numero_pedido = $1", 
        [numero_pedido], 
        (err, result) => {
            if (err) {
                return cb(err, null); // Pasamos el error si ocurre
            }
            return cb(null, result.rows[0]); // Devolvemos el primer resultado si existe
        }
    );
};

ProductoModel.update = (data, cb) => {
  let sql = `
      UPDATE public.producto 
      SET 
          nombre_articulo = $2, 
          precio_unitario = $3, 
          fecha_pedido = $4, 
          cantidad_articulo = $5, 
          monto_total = $6, 
          aplica_impuesto = $7
      WHERE numero_pedido = $1
  `;

  conn.query(sql, [
      data.numero_pedido,
      data.nombre_articulo,   
      data.precio_unitario,
      data.fecha_pedido,
      data.cantidad_articulo,
      data.monto_total,
      data.aplica_impuesto
  ], cb);
};
    
module.exports = ProductoModel;