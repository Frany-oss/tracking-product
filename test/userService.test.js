const UserService = require("../src/services/userService.js");

describe("Servicio de Productos", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("listarUsuarios", () => {
    it("debería listar todos los usuarios exitosamente", async () => {
      const resultado = await UserService.getAllUsers();

      expect(resultado).toBeDefined();
    });
  });

  describe("obtenerusuariosPorRol", async () => {
    it("debería obtener los usuarios por rol exitosamente", async () => {
      const resultado = await ProductService.getUsersByRole("Vendedor");
      expect(resultado).toBeDefined();
    });
  });
});
