var UsuarioModel = require("../models/usuario-model");

var UsuarioController = {
  login: (req, res) => {
    const { nombre_usuario, password } = req.body;

    if (!nombre_usuario || !password) {
      return res.status(400).json({ success: false, message: "Faltan datos" });
    }

    UsuarioModel.login(nombre_usuario, password, (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Error en la base de datos", error: err });
      }

      res.json(result);
    });
  }
};

module.exports = UsuarioController;
