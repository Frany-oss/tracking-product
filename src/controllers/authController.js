const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const { generateWorkerCode } = require("../utils/global.functions.js");

/**
 * @description Función para registrar un nuevo usuario
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Respuesta HTTP con el resultado del registro
 */
exports.register = async function (req, res) {
  try {
    // Extraer datos de la solicitud
    const { email, password, name, phone, position, role } = req.body;

    // Validar si todos los campos están presentes
    if (!email || !password || !name || !phone || !position || !role) {
      return res.status(400).send("Todos los campos son obligatorios.");
    }

    // Validar el formato del correo electrónico
    if (!/^[^@]+@\w+(\.\w+)+\w$/.test(email)) {
      return res.status(400).send("Formato de email inválido.");
    }

    // Generar hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario
    const newUser = new User({
      workerCode: generateWorkerCode(),
      name,
      email,
      phone,
      position,
      role,
      password: hashedPassword,
    });

    // Guardar el usuario en la base de datos
    await newUser.save();
    // Respuesta exitosa
    res.status(201).send("Usuario creado exitosamente");
  } catch (error) {
    // Manejo de errores
    console.error("Error al intentar registrar un usuario:", error);
    res.status(500).send("Error al crear el usuario: " + error.message);
  }
};

/**
 * @description Iniciar sesión de usuario
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Respuesta HTTP con el token de autenticación
 */
exports.login = async function (req, res) {
  // Extraer datos de la solicitud
  const { email, password } = req.body;
  try {
    // Buscar al usuario en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      // Si el usuario no existe, responder con credenciales no válidas
      return res.status(401).send("Credenciales no válidas");
    }

    // Validar la contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      // Si la contraseña es válida, generar un token de autenticación
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({ token });
    } else {
      // Si la contraseña no es válida, responder con credenciales no válidas
      res.status(401).send("Credenciales no válidas");
    }
  } catch (error) {
    // Manejo de errores
    console.error("Error en el proceso de login:", error);
    res.status(500).send("Error interno del servidor");
  }
};

/**
 * @description Middleware para validar el token de autenticación
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función de middleware para pasar al siguiente middleware
 * @returns {Function} - Función de middleware para validar el token
 */
exports.validateToken = function (req, res, next) {
  // Extraer el token del encabezado de autorización
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    // Si no se proporciona un token, responder con acceso denegado
    return res.status(401).send("Acceso denegado. No se proporcionó token.");
  }

  try {
    // Verificar la validez del token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // Pasar al siguiente middleware
    next();
  } catch (error) {
    // Si el token es inválido o ha expirado, responder con un error
    return res.status(401).send("Token inválido o expirado.");
  }
};
