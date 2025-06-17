const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const conectarDB = require("./config/db");

// Rutas
/* const propertyRoutes = require("./routes/propertyRoutes");
const userRoutes = require("./routes/UserRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const arrendatarioRoutes = require("./routes/arrendatarioRoutes");
const reviewsRoutes = require("./routes/reviewsRoute"); */

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Servir archivos estáticos desde la carpeta 'uploads'
app.use("/uploads", express.static("uploads"));

// Usar rutas
/* app.use("/", propertyRoutes);
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", adminRoutes);
app.use("/", arrendatarioRoutes);
app.use("/", reviewsRoutes); */

// Conexión a la base de datos
conectarDB();

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
