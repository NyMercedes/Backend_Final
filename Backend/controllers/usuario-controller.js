const UsuarioModel = require("../models/usuario-model");

const UsuarioController = {
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
  },

  register: (req, res) => {
    const {
      nombre_usuario,
      apellido,
      password,
      email,
      rol
    } = req.body;

    // Validación básica
    if (!nombre_usuario || !apellido || !password || !email || !rol) {
      return res.status(400).json({ success: false, message: "Faltan datos obligatorios para el registro" });
    }

    UsuarioModel.register({
      nombre_usuario,
      apellido,
      password,
      email,
      rol
    }, (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Error al registrar usuario", error: err });
      }

      // Opcional: ocultar contraseña en la respuesta
      if (result.user) {
        delete result.user.password;
      }

      res.json(result);
    });
  },

  getAllUsers: (req, res) => {
    UsuarioModel.getAllUsers((err, users) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Error al obtener usuarios", error: err });
      }
  
      const usuariosSinPassword = users.map(user => {
        const { password, ...rest } = user;
        return rest;
      });
  
      res.json({ success: true, usuarios: usuariosSinPassword });
    });
  }
  
};

module.exports = UsuarioController;
