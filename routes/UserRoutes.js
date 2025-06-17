const express = require("express");
const {
  createUser,
  updateUser,
  getUserById,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// Ruta para crear un usuario
router.post("/user", createUser);

// Ruta para actualizar un usuario por su ID
router.put("/users/:id", updateUser);

// Ruta para obtener un usuario por su ID
router.get("/users/:id", getUserById);

// Ruta para eliminar un usuario por su ID
router.delete("/users/:id", deleteUser);

module.exports = router;
