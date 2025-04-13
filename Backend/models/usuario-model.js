var conn = require("../config/db-connection");

const UsuarioModel = () => {};

UsuarioModel.login = (nombre_usuario, password, cb) => {
  const sql = `SELECT * FROM EntidadUsuario WHERE nombre_usuario = $1 AND password = $2`;

  conn.query(sql, [nombre_usuario, password], (err, result) => {
    if (err) return cb(err, null);

    if (result.rows.length > 0) {
      cb(null, { success: true, message: "Login exitoso", user: result.rows[0] });
    } else {
      cb(null, { success: false, message: "Usuario o contraseña incorrecta" });
    }
  });
};

module.exports = UsuarioModel;
