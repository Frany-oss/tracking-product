/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación de usuarios
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workerCode:
 *                 type: string
 *                 description: Código del trabajador
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *               phone:
 *                 type: string
 *                 description: Número de teléfono del usuario
 *               position:
 *                 type: string
 *                 description: Cargo del usuario
 *               role:
 *                 type: string
 *                 enum: ["Encargado", "Vendedor", "Delivery", "Repartidor"]
 *                 default: "Vendedor"
 *                 description: Rol del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error al registrar el usuario
 */
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error interno del servidor
 */
/**
 * @swagger
 * /api/auth/validate:
 *   get:
 *     summary: Validar Token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *     responses:
 *       200:
 *         description: Token Valido
 *       401:
 *         description: Acceso denegado. No se proporcionó token.
 *       500:
 *         description: Token inválido o expirado.
 */

const express = require("express");
const { login, register, validateToken} = require("../controllers/authController.js");

const router = express.Router();

router.get("/validate", validateToken);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
