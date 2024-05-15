const UserService = require("../services/userService");

/**
 * @description Controlador para obtener todos los usuarios
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Respuesta HTTP con la lista de usuarios
 */
exports.getAllUsers = async function (req, res) {
  try {
    // Llamar al servicio para obtener todos los usuarios
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description Controlador para obtener usuarios por rol
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Respuesta HTTP con la lista de usuarios filtrada por rol
 */
exports.getUsersByRole = async function (req, res) {
  try {
    const { role } = req.params;
    // Llamar al servicio para obtener usuarios por rol
    const users = await UserService.getUsersByRole(role);
    res.json(users);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: error.message });
  }
};
