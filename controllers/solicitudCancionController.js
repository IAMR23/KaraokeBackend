const SolicitudCancion = require("../models/SolicitudCancion");

// Crear una nueva solicitud
const crearSolicitud = async (req, res) => {
  try {
    const { usuario, titulo_sugerido, artista_sugerido, descripcion } = req.body;

    const nuevaSolicitud = new SolicitudCancion({
      usuario,
      titulo_sugerido,
      artista_sugerido,
      descripcion,
      estado: false, // o "pendiente", según tu lógica
    });

    await nuevaSolicitud.save();
    res.status(201).json({ message: "Solicitud enviada exitosamente", solicitud: nuevaSolicitud });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la solicitud", error });
  }
};

// Obtener todas las solicitudes
const obtenerSolicitudes = async (req, res) => {
  try {
    const solicitudes = await SolicitudCancion.find()
      .populate("usuario", "nombre email")
      .sort({ createdAt: -1 });
    res.status(200).json(solicitudes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las solicitudes", error });
  }
};

// Actualizar estado de una solicitud
const actualizarEstadoSolicitud = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body; // true = aceptada, false = pendiente/rechazada

    const solicitud = await SolicitudCancion.findById(id);
    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    solicitud.estado = estado;
    await solicitud.save();

    res.status(200).json({ message: "Estado actualizado", solicitud });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la solicitud", error });
  }
};

// Eliminar solicitud
const eliminarSolicitud = async (req, res) => {
  try {
    const { id } = req.params;

    const solicitud = await SolicitudCancion.findByIdAndDelete(id);
    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    res.status(200).json({ message: "Solicitud eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la solicitud", error });
  }
};

module.exports = {
  crearSolicitud,
  obtenerSolicitudes,
  actualizarEstadoSolicitud,
  eliminarSolicitud,
};
