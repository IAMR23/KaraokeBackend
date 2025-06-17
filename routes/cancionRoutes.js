const express = require("express");
const router = express.Router();
const cancionController = require("../controllers/cancionController");

router.post("/", cancionController.crearCancion);
router.get("/", cancionController.listarCanciones);
router.get("/:id", cancionController.obtenerCancion);
router.put("/:id", cancionController.actualizarCancion);
router.delete("/:id", cancionController.eliminarCancion);

module.exports = router;
