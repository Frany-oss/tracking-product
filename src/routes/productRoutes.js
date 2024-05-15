/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Endpoints para la gestión de productos
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sku:
 *                 type: string
 *                 description: SKU del producto
 *               name:
 *                 type: string
 *                 description: Nombre del producto
 *               type:
 *                 type: string
 *                 description: Tipo del producto
 *               labels:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Etiquetas del producto
 *               price:
 *                 type: number
 *                 description: Precio del producto
 *               unitOfMeasure:
 *                 type: string
 *                 description: Unidad de medida del producto
 *     responses:
 *       200:
 *         description: Producto creado exitosamente
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
 
/**
 * @swagger
 * /api/products/{sku}:
 *   get:
 *     summary: Obtener un producto por SKU
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         description: SKU del producto a obtener
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */

const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const ProductController = require("../controllers/productController");

const router = express.Router();

router.post("/products", authenticateToken, ProductController.createProduct);
router.post("/products/:sku", authenticateToken, ProductController.getProduct);

module.exports = router;
