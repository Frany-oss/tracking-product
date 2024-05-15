const OrderService = require("../services/orderService.js");

/**
 * @description Controlador para crear un nuevo pedido
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Respuesta HTTP con el nuevo pedido creado
 */
exports.createOrder = async function (req, res) {
  try {
    const orderData = req.body;
    // Verificar si faltan datos obligatorios en la solicitud
    if (
      !orderData.productIds ||
      !orderData.status ||
      !orderData.deliveryPerson ||
      !orderData.seller
    ) {
      return res.status(400).send("Faltan datos obligatorios.");
    }

    // Llamar al servicio para crear el pedido
    const newOrder = await OrderService.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    res.status(500).send(error.message);
  }
};

/**
 * @description Controlador para actualizar el estado de un pedido
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Respuesta HTTP con el pedido actualizado
 */
exports.updateOrder = async function (req, res) {
  const { orderId } = req.params;
  const { status: newStatus } = req.body;

  try {
    // Llamar al servicio para actualizar el estado del pedido
    const updatedOrder = await OrderService.updateOrderStatus(orderId, newStatus);
    res.status(200).json(updatedOrder);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: "Error updating order: " + error.message });
  }
};

/**
 * @description Controlador para obtener todos los pedidos
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Respuesta HTTP con la lista de todos los pedidos
 */
exports.getAllOrders = async function (req, res) {
  try {
    // Llamar al servicio para obtener todos los pedidos
    const orders = await OrderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description Controlador para obtener un pedido por número de orden
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Respuesta HTTP con el pedido obtenido
 */
exports.getOrder = async function (req, res) {
  const { orderNumber } = req.params;
  try {
    // Llamar al servicio para obtener un pedido por número de orden
    const order = await OrderService.getOrderbyOrderNumber(orderNumber);
    res.json(order);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description Controlador para obtener un pedido completo por número de orden
 * @param {Object} req - Objeto de solicitud HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @returns {Object} - Respuesta HTTP con el pedido completo obtenido
 */
exports.getFullOrder = async function (req, res) {
  const { orderNumber } = req.params;
  try {
    // Llamar al servicio para obtener un pedido completo por número de orden
    const order = await OrderService.getFullOrderbyOrderNumber(orderNumber);
    res.json(order);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: error.message });
  }
};
