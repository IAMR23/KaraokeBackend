const Cancion = require("../models/Cancion");

const crearCancion = async (req, res) => {
  try {
    const { titulo, artista, generos, videoUrl } = req.body;
    const nuevaCancion = new Cancion({ titulo, artista, generos, videoUrl });
    await nuevaCancion.save();
    res.status(201).json(nuevaCancion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listarCanciones = async (req, res) => {
  try {
    const canciones = await Cancion.find().populate("generos");
    res.json(canciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerCancion = async (req, res) => {
  try {
    const cancion = await Cancion.findById(req.params.id).populate("generos");
    if (!cancion) return res.status(404).json({ error: "Canción no encontrada" });
    res.json(cancion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarCancion = async (req, res) => {
  try {
    const { titulo, artista, generos, videoUrl } = req.body;
    const cancionActualizada = await Cancion.findByIdAndUpdate(
      req.params.id,
      { titulo, artista, generos, videoUrl },
      { new: true }
    );
    if (!cancionActualizada) return res.status(404).json({ error: "Canción no encontrada" });
    res.json(cancionActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminarCancion = async (req, res) => {
  try {
    const cancionEliminada = await Cancion.findByIdAndDelete(req.params.id);
    if (!cancionEliminada) return res.status(404).json({ error: "Canción no encontrada" });
    res.json({ message: "Canción eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const mongoose = require("mongoose");

const filtrarCanciones = async (req, res) => {
  try {
    const { busqueda, ordenFecha } = req.query;

    const pipeline = [
      {
        $lookup: {
          from: "generos", // nombre de la colección en MongoDB
          localField: "generos",
          foreignField: "_id",
          as: "generos",
        },
      },
    ];

    if (busqueda) {
      const regex = new RegExp(busqueda, "i");

      pipeline.push({
        $match: {
          $or: [
            { titulo: { $regex: regex } },
            { artista: { $regex: regex } },
            { "generos.nombre": { $regex: regex } },
          ],
        },
      });
    }

    // Ordenar por fecha de creación
    pipeline.push({
      $sort: {
        createdAt: ordenFecha === "asc" ? 1 : -1,
      },
    });

    const canciones = await mongoose.model("Cancion").aggregate(pipeline);

    res.status(200).json({ canciones });
  } catch (error) {
    console.error("Error en filtro por búsqueda:", error);
    res.status(500).json({ message: "Error al filtrar canciones", error });
  }
};



module.exports = {
  crearCancion,
  listarCanciones,
  obtenerCancion,
  actualizarCancion,
  eliminarCancion,
  filtrarCanciones
};
