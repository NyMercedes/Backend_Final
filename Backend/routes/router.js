"use strict";
//ENTIDAD PEDIDO --- MERCEDES
var PedidoController = require("../controllers/pedido-controller")
var ClienteController = require("../controllers/ClienteController")
var ProductoController = require("../controllers/producto-controller")
var PagoController = require("../controllers/pago-controller")
var UsuarioController = require("../controllers/usuario-controller"),

   express = require("express"),
  router = express.Router();

  router 
    //**** RUTAS USUARIO LOGIN ****
    .post("/usuario/Login", UsuarioController.login)

  //****RUTAS ENTIDAD PEDIDO****
  .get("/pedido/TodosPedidos", PedidoController.getAll)
  .post("/pedido/InsertarPedido", PedidoController.post)
  .delete("/pedido/EliminarPedido", PedidoController.delete)
  .post("/pedido/UnicoPedido", PedidoController.getById)
  .put("/pedido/Actualizar", PedidoController.update)
 
  //****RUTAS ENTIDAD CLIENTE ---- LORENZO****
  .get("/cliente/TodosClientes", ClienteController.getAll)
  .post("/cliente/InsertarCliente", ClienteController.post)
  .delete("/cliente/EliminarCliente", ClienteController.delete)
  .post("/cliente/UnicoCliente", ClienteController.getById)
  .put("/cliente/Actualizar", ClienteController.update)

  //****RUTAS ENTIDAD PAGO ---- JOSSTYM****
  .get("/pago/TodosPagos", PagoController.getAll)
  .post("/pago/InsertarPago", PagoController.post)
  .delete("/pago/EliminarPago", PagoController.delete)
  .post("/pago/UnicoPago", PagoController.getById)
  .put("/pago/ActualizarPago", PagoController.update)

  //ENTIDAD PRODUCTO --- LESTER

  .get("/producto/TodosProducto", ProductoController.getAll)
  .post("/producto/InsertarProducto", ProductoController.post)
  .delete("/producto/EliminarProducto", ProductoController.delete)
  .post("/producto/UnicoProducto", ProductoController.getById)
  .put("/producto/ActualizarProducto", ProductoController.update)
  .use(ProductoController.error404)



  .use(PedidoController.error404);
  module.exports = router;