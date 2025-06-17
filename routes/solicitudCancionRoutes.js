const express = require("express");
const router = express.Router();
const {
  crearSolicitud,
  obtenerSolicitudes,
  actualizarEstadoSolicitud,
  eliminarSolicitud,
} = require("../controllers/solicitudCancionController");

// Crear nueva solicitud
router.post("/", crearSolicitud);

// Obtener todas las solicitudes
router.get("/", obtenerSolicitudes);

// Actualizar estado de solicitud por ID
router.put("/:id", actualizarEstadoSolicitud);

// Eliminar solicitud por ID
router.delete("/:id", eliminarSolicitud);

module.exports = router;
