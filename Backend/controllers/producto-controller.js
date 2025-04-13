'use strict'

var ProductoModel = require('../models/producto-model'),
    ProductoController = () => {}

ProductoController.getAll = (req, res, next) => {

        ProductoModel.getAll((err, rows) => {
            if(err)
            {
                let locals = {
                    title : 'Error al consultar la base de datoos',
                    description : 'Error de Sintaxis SQL',
                    error : err
                }
    
                res.render('error', locals)
            }
            else
            {
                let locals = {
                    title : 'Lista de Productos',
                    data : rows
                }
                res.status(200).send(rows.rows)
                //res.render('index', locals)
            }
        })
}

ProductoController.post = (req, res, next) => {
    let producto = {
        numero_pedido : req.body.numero_pedido,
        nombre_articulo : req.body.nombre_articulo,
        precio_unitario : req.body.precio_unitario,
        fecha_pedido : req.body.fecha_pedido,
        cantidad_articulo : req.body.cantidad_articulo,
        monto_total : req.body.monto_total,
        aplica_impuesto : req.body.aplica_impuesto
    }
    
    console.log(producto)
    
    ProductoModel.post(producto, (err) => {
        if(err)
        {
            let locals = {
                title : `Error al salvar el Producto con el id: ${producto.numero_pedido}`,
                description : "Error de Sintaxis SQL",
                error : err
            }
    
            //res.render('error', locals)
            res.status(520).json(err);
        }
        else
        {
            res.send('Producto Ingresado de Forma Correcta')
            //res.redirect('/')
        }
    })
}
ProductoController.delete = (req, res, next) => {
    let numero_pedido = req.body.numero_pedido
    console.log(numero_pedido)

    ProductoModel.delete(numero_pedido, (err, rows) => {
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
            res.send('Producto Eliminado de Forma Correcta')
            
        }
    })
}

ProductoController.getById = (req, res, next) => {
    const { numero_pedido } = req.body; // Obtenemos el número de pedido del cuerpo de la solicitud.

    if (!numero_pedido) {
        return res.status(400).json({ error: "El número de pedido es necesario" });
    }

    ProductoModel.getById(numero_pedido, (err, producto) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener el producto", details: err });
        }

        if (!producto) {
            return res.status(200).json({mensaje: "Producto no encontrado" });
        }

        res.json(producto); // Si se encuentra, devolvemos el producto
    });
};


// estos metodos los dejan tal cual como esta....
ProductoController.addForm = (req, res, next) => 
    res.render('add-Producto', { title : 'Agregar Producto' })

ProductoController.error404 = (req, res, next) => {
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


ProductoController.update = (req, res, next) => {
    let Producto = {
        numero_pedido : req.body.numero_pedido,
        nombre_articulo : req.body.nombre_articulo,
        precio_unitario : req.body.precio_unitario,
        fecha_pedido : req.body.fecha_pedido,
        cantidad_articulo : req.body.cantidad_articulo,
        monto_total : req.body.monto_total,
        aplica_impuesto : req.body.aplica_impuesto
    };

    if (!Producto.numero_pedido) {
        return res.status(400).json({ error: "El código del libro es necesario" });
    }

    ProductoModel.update(Producto, (err) => {
        if (err) {
            return res.status(500).json({ error: "Error al actualizar el producto", details: err });
        }

        res.send('Producto actualizado correctamente');
    });
};


module.exports = ProductoController