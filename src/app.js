const express = require("express");
const swaggerConfig = require("./swagger");
const connectDB = require("./config/database.js");
const authRoutes = require("./routes/authRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const app = express();
swaggerConfig(app);
const PORT = process.env.PORT || 3456;

connectDB();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", orderRoutes);
app.use("/api", productRoutes);
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("¡Conexión a MongoDB establecida con éxito!");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
