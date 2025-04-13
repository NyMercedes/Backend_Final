'use strict'

var PagoModel = require('../models/pago-model'),
    PagoController = () => {todos}

//mostrar todos los pagos
PagoController.getAll = (req, res, next) => {
    PagoModel.getAll((err, rows) => {
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
                title : 'Lista de Pagos',
                data : rows
            }
            res.status(200).send(rows.rows)
        }
    })
}

PagoController.post = (req, res, next) => {
    let pago = {
        numero_de_pago : req.body.numero_de_pago,
        fecha_de_pago : req.body.fecha_de_pago,
        monto_de_pago : req.body.monto_de_pago,
        tipo_de_pago : req.body.tipo_de_pago,
        numero_de_pedido : req.body.numero_de_pedido,
        empresa : req.body.empresa
    }

    console.log(pago)

    PagoModel.post(pago, (err) => {
        if(err)
        {
            let locals = {
                title : `Error al salvar el Pago con el id: ${pago.numero_de_pago}`,
                description : "Error de Sintaxis SQL",
                error : err
            }

            res.status(520).json(err);
        }
        else
        {
            res.send('Pago Ingresado de Forma Correcta')
        }
    })
}

PagoController.delete = (req, res, next) => {
    let numero_de_pago = req.body.numero_de_pago
    console.log(numero_de_pago)

    PagoModel.delete(numero_de_pago, (err, rows) => {
        console.log(err, '---', rows)
        if(err)
        {
            let locals = {
                title : `Error al eliminar el registro con el id: ${numero_de_pago}`,
                description : "Error de Sintaxis SQL",
                error : err
            }
//
            res.render('error', locals)
        }
        else
        {
            res.send('Pago Eliminado de Forma Correcta')
            
        }
    })
}

PagoController.getById = (req, res, next) => {
    const { numero_de_pago } = req.body;

    if (!numero_de_pago) {
        return res.status(400).json({ error: "El número de pago es necesario" });
    }

    PagoModel.getById(numero_de_pago, (err, pago) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener el pago", details: err });
        }

        if (!pago) {
            return res.status(200).json({ mensaje: "El pago no se encuentra registrado" });
        }
        
        res.json(pago);
    });
};

PagoController.update = (req, res, next) => {
    let pago = {
        numero_de_pago : req.body.numero_de_pago,
        fecha_de_pago : req.body.fecha_de_pago,
        monto_de_pago : req.body.monto_de_pago,
        tipo_de_pago : req.body.tipo_de_pago,
        numero_de_pedido : req.body.numero_de_pedido,
        empresa : req.body.empresa
    };

    if (!pago.numero_de_pago) {
        return res.status(400).json({ error: "El número de pago es necesario" });
    }

    PagoModel.update(pago, (err) => {
        if (err) {
            return res.status(500).json({ error: "Error al actualizar el pago", details: err });
        }

        res.send('Pago actualizado correctamente');
    });
};

PagoController.error404 = (req, res, next) => {
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

module.exports = PagoController    
    