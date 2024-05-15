const Product = require("../models/Product");

/**
 * @description Servicio para gestionar los productos
 */
class ProductService {
  /**
   * @description Crear un nuevo producto
   * @param {Object} productData - Datos del producto a crear
   * @returns {Promise<Object>} - El nuevo producto creado
   */
  static async createProduct(productData) {
    // Validaciones
    if (!productData.sku || !productData.name || !productData.price || !productData.unitOfMeasure) {
      throw new Error("Faltan campos obligatorios.");
    }

    if (typeof productData.price !== "number" || productData.price <= 0) {
      throw new Error("El precio debe ser un número positivo.");
    }

    if (!/^[A-Z0-9_]+$/i.test(productData.sku)) {
      throw new Error("El SKU debe contener solo caracteres alfanuméricos y guiones bajos.");
    }

    const productExists = await Product.findOne({ sku: productData.sku });
    if (productExists) {
      throw new Error("Un producto con este SKU ya existe.");
    }

    const product = new Product(productData);
    await product.save();
    return product;
  }

  /**
   * @description Obtener un producto por su SKU
   * @param {string} sku - SKU del producto a obtener
   * @returns {Promise<Object>} - El producto encontrado
   */
  static async getProductBySku(sku) {
    try {
      const product = await Product.findOne({ sku: sku });
      if (!product) {
        throw new Error("Producto no encontrado con el SKU: " + sku);
      }
      return product;
    } catch (error) {
      console.error("Error al obtener el producto por SKU:", error);
      throw new Error("Error al obtener el producto por SKU: " + error.message);
    }
  }
}

module.exports = ProductService;
