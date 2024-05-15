const mongoose = require("mongoose");

// Conectar a la base de datos antes de ejecutar las pruebas
beforeAll(async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://admin:admin123@admin.ehx14ak.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  console.log(`MongoDB Connected: ${conn.connection.host}`);
});

// Desconectar de la base de datos después de que todas las pruebas hayan terminado
afterAll(async () => {
  await mongoose.connection.close();
});
