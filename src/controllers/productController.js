const ProductService = require("../services/productService.js");

/**
 * @description Controlador para crear un nuevo producto
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Respuesta HTTP con el nuevo producto creado
 */
exports.createProduct = async function (req, res) {
  try {
    // Llamar al servicio para crear un nuevo producto
    const newProduct = await ProductService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    // Manejo de errores
    console.error("Error al crear el producto:", error.message);
    res.status(400).send(error.message);
  }
};

/**
 * @description Controlador para obtener un producto por SKU
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Respuesta HTTP con el producto obtenido
 */
exports.getProduct = async function (req, res) {
  const { sku } = req.params;
  try {
    // Llamar al servicio para obtener un producto por SKU
    const product = await ProductService.getProductBySku(sku);
    res.json(product);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: error.message });
  }
};
