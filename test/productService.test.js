const ProductService = require("../src/services/productService.js");

describe("Servicio de Productos", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("crearProducto", () => {
    it("debería crear un nuevo producto exitosamente", async () => {
      const datosProducto = {
        sku: "SKU5983",
        name: "Producto X",
        type: "Tecnolgia",
        labels: ["nuevo", "celular", "tecnologia"],
        price: 509.99,
        unitOfMeasure: "u",
      };

      const resultado = await ProductService.createProduct(datosProducto);

      expect(resultado).toBeDefined();
    });
  });

  describe("obtenerProductoPorSKU", async () => {
    it("debería obtener el producto con ese SKU exitosamente", async () => {
      const resultado = await ProductService.getProductBySku("SKU1767");
      expect(resultado).toBeDefined();
    });
  });
});
