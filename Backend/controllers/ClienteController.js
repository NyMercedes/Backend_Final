'use strict'

var ClienteModel = require('../models/ClienteModel'),
    ClienteController = () => {}

ClienteController.getAll = (req, res, next) => {
    ClienteModel.getAll((err, rows) => {
        if (err) {
            let locals = {
                title: 'Error al consultar la base de datos',
                description: 'Error de Sintaxis SQL',
                error: err
            }
            res.render('error', locals)
        } else {
            let locals = {
                title: 'Lista de Clientes',
                data: rows
            }
            res.status(200).send(rows.rows)
        }
    })
}

ClienteController.post = (req, res, next) => {
    let cliente = {
        numero_cliente : req.body.numero_cliente,
        nombre : req.body.nombre,
        apellidos : req.body.apellidos,
        fecha_de_registro : req.body.fecha_de_registro,
        direccion_cliente : req.body.direccion_cliente,
        rtn : req.body.rtn,
        email : req.body.email
    }

    console.log(cliente)

    ClienteModel.post(cliente, (err) => {
        if(err)
        {
            let locals = {
                title : `Error al salvar el Cliente con el id: ${cliente.numero_cliente}`,
                description : "Error de Sintaxis SQL",
                error : err
            }

            //res.render('error', locals)
            res.status(520).json(err);
        }
        else
        {
            res.send('Cliente Ingresado de Forma Correcta')
            //res.redirect('/')
        }
    })
}

ClienteController.delete = (req, res, next) => {
    let numero_cliente = req.body.numero_cliente
    console.log(numero_cliente)

    ClienteModel.delete(numero_cliente, (err, rows) => {
        console.log(err, '---', rows)
        if (err) {
            let locals = {
                title: `Error al eliminar el registro con el id: ${numero_cliente}`,
                description: "Error de Sintaxis SQL",
                error: err
            }
            res.render('error', locals)
        } else {
            res.send('Cliente Eliminado de Forma Correcta')
        }
    })
}

ClienteController.getById = (req, res, next) => {
    const { numero_cliente } = req.body;

    if (!numero_cliente) {
        return res.status(400).json({ error: "El número de cliente es necesario" });
    }

    ClienteModel.getById(numero_cliente, (err, cliente) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener el cliente", details: err });
        }

        if (!cliente) {
            return res.status(200).json({mensaje: "Cliente no encontrado" });
        }

        res.json(cliente);
    });
};

ClienteController.update = (req, res, next) => {
    let cliente = {
        numero_cliente: req.body.numero_cliente,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        fecha_de_registro: req.body.fecha_de_registro,
        direccion_cliente: req.body.direccion_cliente,
        rtn: req.body.rtn,
        email: req.body.email
    };

    if (!cliente.numero_cliente) {
        return res.status(400).json({ error: "El número de cliente es necesario" });
    }

    ClienteModel.update(cliente, (err) => {
        if (err) {
            return res.status(500).json({ error: "Error al actualizar el cliente", details: err });
        }

        res.send('Cliente actualizado correctamente');
    });
};

// Métodos que se mantienen igual
ClienteController.addForm = (req, res, next) => 
    res.render('add-pedido', { title: 'Agregar Cliente' })

ClienteController.error404 = (req, res, next) => {
    let error = new Error(),
        locals = {
            title: 'Error 404',
            description: 'Recurso No Encontrado',
            error: error
        }

    error.status = 404
    res.render('error', locals)
    next()
}

module.exports = ClienteController