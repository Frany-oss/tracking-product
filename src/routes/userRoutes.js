/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para la gestión de usuarios
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */

 /**
 * @swagger
 * /api/users/{role}:
 *   get:
 *     summary: Obtener usuarios por rol
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         description: Rol de los usuarios a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuarios no encontrados con el rol especificado
 *       500:
 *         description: Error interno del servidor
 */

const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const UserController = require("../controllers/userController");

const router = express.Router();

router.get("/users", authenticateToken, UserController.getAllUsers);
router.get("/users/:role", authenticateToken, UserController.getUsersByRole);

module.exports = router;
