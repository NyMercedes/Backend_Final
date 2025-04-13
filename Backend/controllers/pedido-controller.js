'use strict'

var PedidoModel = require('../models/pedido-model'),
    PedidoController = () => {}

PedidoController.getAll = (req, res, next) => {

    PedidoModel.getAll((err, rows) => {
        if(err)
        {
            let locals = {
                title : 'Error al consultar la base de datos',
                description : 'Error de Sintaxis SQL',
                error : err
            }

            res.render('error', locals)
        }
        else
        {
            let locals = {
                title : 'Lista de Pedidos',
                data : rows
            }
            res.status(200).send(rows.rows)
            //res.render('index', locals)
        }
    })
}

PedidoController.post = (req, res, next) => {
    let pedido = {
        numero_pedido : req.body.numero_pedido,
        numero_cliente : req.body.numero_cliente,
        empresa : req.body.empresa,
        fecha_pedido : req.body.fecha_pedido,
        direccion : req.body.direccion,
        tipo_pago : req.body.tipo_pago,
        monto_total : req.body.monto_total
    }

    console.log(pedido)

    PedidoModel.post(pedido, (err) => {
        if(err)
        {
            let locals = {
                title : `Error al salvar el Pedido con el id: ${pedido.numero_pedido}`,
                description : "Error de Sintaxis SQL",
                error : err
            }

            //res.render('error', locals)
            res.status(520).json(err);
        }
        else
        {
            res.send('Pedido Ingresado de Forma Correcta')
            //res.redirect('/')
        }
    })
}

PedidoController.delete = (req, res, next) => {
    let numero_pedido = req.body.numero_pedido
    console.log(numero_pedido)

    PedidoModel.delete(numero_pedido, (err, rows) => {
        console.log(err, '---', rows)
        if(err)
        {
            let locals = {
                title : `Error al eliminar el registro con el id: ${numero_pedido}`,
                description : "Error de Sintaxis SQL",
                error : err
            }
//
            res.render('error', locals)
        }
        else
        {
            res.send('Pedido Eliminado de Forma Correcta')
            
        }
    })
}

PedidoController.getById = (req, res, next) => {
    const { numero_pedido } = req.body; // Obtenemos el número de pedido del cuerpo de la solicitud.

    if (!numero_pedido) {
        return res.status(400).json({ error: "El número de pedido es necesario" });
    }

    PedidoModel.getById(numero_pedido, (err, pedido) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener el pedido", details: err });
        }

        if (!pedido) {
            return res.status(200).json({mensaje: "Pedido no encontrado" });
        }

        res.json(pedido); // Si se encuentra, devolvemos el pedido
    });
};

PedidoController.update = (req, res, next) => {
    let Pedido = {
        numero_pedido : req.body.numero_pedido,
        numero_cliente : req.body.numero_cliente,
        empresa : req.body.empresa,
        fecha_pedido : req.body.fecha_pedido,
        direccion : req.body.direccion,
        tipo_pago : req.body.tipo_pago,
        monto_total : req.body.monto_total
    };

    if (!Pedido.numero_pedido) {
        return res.status(400).json({ error: "El código del libro es necesario" });
    }

    PedidoModel.update(Pedido, (err) => {
        if (err) {
            return res.status(500).json({ error: "Error al actualizar el pedido", details: err });
        }

        res.send('Pedido actualizado correctamente');
    });
};

// estos metodos los dejan tal cual como esta....
PedidoController.addForm = (req, res, next) => 
    res.render('add-pedido', { title : 'Agregar Pedido' })

PedidoController.error404 = (req, res, next) => {
    let error = new Error(),
        locals = {
            title : 'Error 404',
            description : 'Recurso No Encontrado',
            error : error
        }

    error.status = 404

    res.render('error', locals)

    next()
}

module.exports = PedidoController