/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Endpoints para la gestión de pedidos
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: IDs de los productos asociados al pedido
 *               seller:
 *                 type: string
 *                 description: ID del vendedor
 *               deliveryPerson:
 *                 type: string
 *                 description: ID de la persona de entrega
 *               status:
 *                 type: string
 *                 enum: ["Por atender", "En proceso", "En delivery", "Recibido"]
 *                 default: "Por atender"
 *                 description: Estado del pedido
 *     responses:
 *       200:
 *         description: Pedido creado exitosamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 *
 *   get:
 *     summary: Obtener todos los pedidos
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida exitosamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/orders/{orderId}/status:
 *   patch:
 *     summary: Actualizar el estado de un pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: ID del pedido a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Nuevo estado del pedido
 *     responses:
 *       200:
 *         description: Estado del pedido actualizado exitosamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/orders/{orderNumber}:
 *   get:
 *     summary: Obtener un pedido por número de orden
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderNumber
 *         required: true
 *         description: Número de orden del pedido a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido obtenido exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Pedido no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/orders/full/{orderNumber}:
 *   get:
 *     summary: Obtener un pedido completo por número de orden
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderNumber
 *         required: true
 *         description: Número de orden del pedido completo a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pedido completo obtenido exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Pedido completo no encontrado
 *       500:
 *         description: Error interno del servidor
 */

const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken.js");
const {
  createOrder,
  updateOrder,
  getAllOrders,
  getOrder,
  getFullOrder,
} = require("../controllers/orderController.js");

const router = express.Router();

router.post("/orders", authenticateToken, createOrder);
router.patch("/orders/:orderId/status", authenticateToken, updateOrder);
router.get("/orders", authenticateToken, getAllOrders);
router.get("/orders/:orderNumber", authenticateToken, getOrder);
router.get("/orders/full/:orderNumber", authenticateToken, getFullOrder);

module.exports = router;
