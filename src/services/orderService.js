const Order = require("../models/Order.js");
const User = require("../models/User.js");
const { generateOrderNumber } = require("../utils/global.functions.js");

/**
 * @description Servicio para gestionar los pedidos
 */
class OrderService {
  /**
   * @description Crear un nuevo pedido
   * @param {Object} orderData - Datos del pedido a crear
   * @returns {Promise<Object>} - El nuevo pedido creado
   */
  static async createOrder(orderData) {
    try {
      // Validar que los usuarios especificados existan y tengan los roles correctos
      const deliveryPerson = await User.findById(orderData.deliveryPerson);
      if (!deliveryPerson || deliveryPerson.role !== "Repartidor") {
        throw new Error("La persona de entrega no existe o no tiene el rol correcto.");
      }

      const seller = await User.findOne({ _id: orderData.seller, role: "Vendedor" });
      if (!seller) {
        throw new Error("El vendedor no existe o no tiene el rol correcto.");
      }

      // Validar status
      const validStatuses = ["Por atender", "En proceso", "En delivery", "Recibido"];
      if (!validStatuses.includes(orderData.status)) {
        throw new Error("Estado no válido.");
      }

      const orderNumber = generateOrderNumber();

      // Crear el pedido
      const order = new Order({
        ...orderData,
        orderNumber: orderNumber,
        deliveryPerson: deliveryPerson._id,
        seller: seller._id,
      });

      // Asignar fechas basadas en el estado del pedido
      const currentDate = new Date();
      switch (orderData.status) {
        case "Por atender":
          order.orderDate = currentDate;
          break;
        case "En proceso":
          order.receptionDate = currentDate;
          break;
        case "En delivery":
          order.dispatchDate = currentDate;
          break;
        case "Recibido":
          order.deliveryDate = currentDate;
          break;
      }

      await order.save();
      return order;
    } catch (error) {
      console.error("Error al intentar registrar un pedido:", error);
      throw new Error("Error al crear un pedido: " + error.message);
    }
  }

  /**
   * @description Actualizar el estado de un pedido
   * @param {string} orderId - ID del pedido a actualizar
   * @param {string} newStatus - Nuevo estado del pedido
   * @returns {Promise<Object>} - El pedido actualizado
   */
  static async updateOrderStatus(orderId, newStatus) {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error("Pedido no encontrado.");
      }

      const validStatuses = ["Por atender", "En proceso", "En delivery", "Recibido"];
      const statusIndex = validStatuses.indexOf(order.status);
      const newStatusIndex = validStatuses.indexOf(newStatus);

      if (newStatusIndex === -1) {
        throw new Error("Estado no válido.");
      }

      // Asegurar la jerarquía de estados
      if (newStatusIndex <= statusIndex) {
        throw new Error("Cambio de estado no permitido según la jerarquía.");
      }

      // Actualizar el estado y la fecha correspondiente
      order.status = newStatus;
      const currentDate = new Date();
      switch (newStatus) {
        case "Por atender":
          order.orderDate = currentDate;
          break;
        case "En proceso":
          order.receptionDate = currentDate;
          break;
        case "En delivery":
          order.dispatchDate = currentDate;
          break;
        case "Recibido":
          order.deliveryDate = currentDate;
          break;
      }

      await order.save();
      return order;
    } catch (error) {
      console.error("Error al intentar actualizar el pedido:", error);
      throw new Error("Error al actualizar el pedido: " + error.message);
    }
  }

  /**
   * @description Obtener todos los pedidos
   * @returns {Promise<Array>} - Array de pedidos
   */
  static async getAllOrders() {
    try {
      const orders = await Order.find();
      return orders;
    } catch (error) {
      console.error("Error al obtener todos los pedidos:", error);
      throw new Error("Error al recuperar pedidos: " + error.message);
    }
  }

  /**
   * @description Obtener un pedido por su número de orden
   * @param {string} orderNumber - Número de orden del pedido a obtener
   * @returns {Promise<Object>} - El pedido encontrado
   */
  static async getFullOrderbyOrderNumber(orderNumber) {
    try {
      const order = await Order.findOne({ orderNumber: orderNumber })
        .populate("productIds")
        .populate({
          path: "seller",
          select: "-password",
        })
        .populate({
          path: "deliveryPerson",
          select: "-password",
        });
      if (!order) {
        throw new Error("Pedido no encontrado con el número de orden: " + orderNumber);
      }
      return order;
    } catch (error) {
      console.error("Error al obtener el pedido por número de orden:", error);
      throw new Error("Error al recuperar el pedido: " + error.message);
    }
  }
}

module.exports = OrderService;
