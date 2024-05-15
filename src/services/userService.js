const User = require("../models/User");

/**
 * @description Servicio para gestionar los usuarios
 */
class UserService {
  /**
   * @description Obtener todos los usuarios
   * @returns {Promise<Array>} - Array de usuarios
   */
  static async getAllUsers() {
    try {
      const users = await User.find().select("-password");
      return users;
    } catch (error) {
      console.error("Error al obtener todos los usuarios:", error);
      throw new Error("Error al recuperar usuarios: " + error.message);
    }
  }

  /**
   * @description Obtener usuarios por rol
   * @param {string} role - Rol de los usuarios a obtener
   * @returns {Promise<Array>} - Array de usuarios con el rol especificado
   */
  static async getUsersByRole(role) {
    try {
      const users = await User.find({ role: role });
      if (!users || users.length === 0) {
        throw new Error("Usuarios no encontrados con rol: " + role);
      }
      return users;
    } catch (error) {
      console.error("Error al obtener los usuarios por rol:", error);
      throw new Error("Error al recuperar los usuarios por rol: " + error.message);
    }
  }
}

module.exports = UserService;
