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

UsuarioModel.register = (data, cb) => {
  const {
    nombre_usuario,
    apellido,
    password,
    email,
    rol
  } = data;

  const sql = `
    INSERT INTO EntidadUsuario (
      nombre_usuario,
      apellido,
      password,
      email,
      estado,
      ultima_fecha_hora_ingreso,
      password_expira,
      dias_caducidad_password,
      rol,
      numero_intentos_incorrectos,
      fecha_registro
    ) VALUES (
      $1, $2, $3, $4, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 90, $5, 0, CURRENT_TIMESTAMP
    )
    RETURNING *;
  `;

  const values = [
    nombre_usuario,  // $1
    apellido,        // $2
    password,        // $3
    email,           // $4
    rol              // $5
  ];

  conn.query(sql, values, (err, result) => {
    if (err) return cb(err, null);
    cb(null, { success: true, message: "Usuario registrado correctamente", user: result.rows[0] });
  });
};


module.exports = UsuarioModel;
