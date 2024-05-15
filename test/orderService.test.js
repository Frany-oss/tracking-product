const OrderService = require("../src/services/orderService.js");

describe("Servicio de Órdenes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("crearOrden", () => {
    it("debería crear una nueva orden exitosamente", async () => {
      const datosOrden = {
        productIds: ["66444fb7548789a82cde0a9e", "66444fdb548789a82cde0aa2"],
        status: "Por atender",
        deliveryPerson: "66444f66548789a82cde0a97",
        seller: "66444f9e548789a82cde0a9a",
      };

      const resultado = await OrderService.createOrder(datosOrden);

      expect(resultado).toBeDefined();
    });

    it("debería lanzar un error si la persona de entrega no existe o tiene un rol incorrecto", async () => {
      const datosOrden = {
        productIds: ["66444fb7548789a82cde0a9e", "66444fdb548789a82cde0aa2"],
        deliveryPerson: "66445173060bcb4122b446d1",
        seller: "66444f9e548789a82cde0a9a",
        status: "Por atender",
      };

      await expect(OrderService.createOrder(datosOrden)).rejects.toThrow(
        "La persona de entrega no existe o no tiene el rol correcto."
      );
    });

    it("debería lanzar un error si el vendedor no existe o tiene un rol incorrecto", async () => {
      const datosOrden = {
        productIds: ["66444fb7548789a82cde0a9e", "66444fdb548789a82cde0aa2"],
        deliveryPerson: "66444f66548789a82cde0a97",
        seller: "66445173060bcb4122b446d1",
        status: "Por atender",
      };

      await expect(OrderService.createOrder(datosOrden)).rejects.toThrow(
        "El vendedor no existe o no tiene el rol correcto."
      );
    });
  });

  describe("actualizarEstadoOrden", () => {
    it("Actualizar el estado correctamente", async () => {
      const resultado = await OrderService.updateOrderStatus(
        "664505216e2bbcccb96227f3",
        "En delivery"
      );

      expect(resultado).toHaveProperty("status", "En delivery");
    });

    it("Error por jerarquía", async () => {
      await expect(
        OrderService.updateOrderStatus("66445173060acb42d2b446d1", "En delivery")
      ).rejects.toThrow(
        "Error al actualizar el pedido: Cambio de estado no permitido según la jerarquía."
      );
    });
  });

  describe("obtenerTodasLasOrdenes", async () => {
    it("debería listar todas las órdenes exitosamente", async () => {
      const resultado = await OrderService.getAllOrders();
      expect(resultado).toBeDefined();
    });
  });

  describe("obtenerOrdenPorNumeroDeOrden", async () => {
    it("debería listar todas las órdenes exitosamente", async () => {
      const resultado = await OrderService.getOrderbyOrderNumber("664505216e2bbcccb96227f3");
      expect(resultado).toBeDefined();
    });
  });

  describe("obtenerOrdenCompletaPorNumeroDeOrden", async () => {
    it("debería listar todas las órdenes exitosamente", async () => {
      const resultado = await OrderService.getFullOrderbyOrderNumber("664505216e2bbcccb96227f3");
      expect(resultado).toBeDefined();
    });
  });
});
